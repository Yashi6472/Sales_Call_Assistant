from app.llm import llm

def analyze_buyer_intent(
    transcript,
    custom_prompt
):

    prompt = f"""
    {custom_prompt}

    Transcript:
    {transcript}
    """

    response = llm.invoke(prompt)

    return response.split("\n")