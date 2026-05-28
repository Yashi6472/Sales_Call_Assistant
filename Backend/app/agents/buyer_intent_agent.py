from app.llm import llm

def analyze_buyer_intent(transcript):

    prompt = f"""
    You are a real estate sales analyst.

    Analyze this transcript.

    Identify strong buyer intent signals.

    Return 3 concise bullet points.
    Do not add explanations.
    Do not add headings.
    Maximum 3 bullet points
    Transcript:
    {transcript}
    """

    response = llm.invoke(prompt)

    return [
    line.strip("- ").strip()
    for line in response.split("\n")
    if line.strip()
]