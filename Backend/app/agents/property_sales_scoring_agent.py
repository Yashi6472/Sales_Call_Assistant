import json
from pathlib import Path
from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

RUBRIC_PATH = Path("app/prompts/property_sales_scoring_rubric.json")


def load_rubric():
    with open(RUBRIC_PATH, "r") as file:
        return json.load(file)


def build_prompt(transcript, rubric):

    checks = []

    for section, items in rubric.items():
        for item in items:
            checks.append(f'- {item["id"]}')

    checks_text = "\n".join(checks)

    prompt = f"""
You are analyzing a property sales call transcript.

For each item below, return ONLY true or false.

Items:
{checks_text}

Return STRICT JSON only.

Example:
{{
  "budget": true,
  "location": false
}}

Transcript:
{transcript}
"""

    return prompt


def calculate_score(ai_result, rubric):

    total_score = 0
    earned_score = 0

    breakdown = {}

    for section, items in rubric.items():

        section_score = 0
        section_total = 0

        for item in items:

            question_id = item["id"]
            question_score = item["score"]

            section_total += question_score
            total_score += question_score

            if ai_result.get(question_id) is True:
                earned_score += question_score
                section_score += question_score

        breakdown[section] = {
            "score": section_score,
            "total": section_total
        }

    final_percentage = round((earned_score / total_score) * 100)

    return {
        "overall_score": final_percentage,
        "earned_score": earned_score,
        "total_score": total_score,
        "breakdown": breakdown
    }


def run_property_sales_scoring(transcript):

    rubric = load_rubric()

    prompt = build_prompt(transcript, rubric)

    response = client.chat.completions.create(
        model="gpt-4.1-mini",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0
    )

    content = response.choices[0].message.content

    ai_result = json.loads(content)

    final_result = calculate_score(ai_result, rubric)

    final_result["ai_analysis"] = ai_result

    return final_result