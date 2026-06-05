from app.llm import llm

def generate_summary(
    call,
    custom_prompt
):

    prompt = f"""
    {custom_prompt}

    Call Data:
    {call}
    """

    response = llm.invoke(prompt)

    return response