from app.llm import llm

def analyze_deal_probability(transcript):

    prompt = f"""
    You are a sales AI system.

    Analyze this transcript and estimate
    the probability of this deal closing.

    Return ONLY a single integer number.

    Example:
    82

    Do NOT explain.
    Do NOT write sentences.
    Do NOT write percentage symbol.

    Transcript:
    {transcript}
    """

    response = llm.invoke(prompt)

    cleaned = ''.join(
        filter(str.isdigit, response)
    )

    return cleaned if cleaned else "0"