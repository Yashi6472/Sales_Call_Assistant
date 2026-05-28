from app.llm import llm

def analyze_objections(transcript):

    prompt = f"""
    You are a real estate sales analyst.

    Analyze this conversation transcript.

    Extract the buyer objections.

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