from app.llm import llm

def generate_summary(call):

    prompt = f"""
    You are an expert real estate sales analyst.

    Analyze this property buying discussion
    and generate a concise sales summary.
    return Maximum 3 bullet points
    Lead Name:
    {call['leadName']}

    Lead Type:
    {call['leadType']}

    Call Summary:
    {call['callSummary']}
    """

    response = llm.invoke(prompt)

    return response