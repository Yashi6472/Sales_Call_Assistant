from app.llm import llm

def analyze_agent_score(transcript):

    prompt = f"""
        You are an expert real estate sales evaluator.

        Analyze how well the property sales agent handled the conversation.

        Evaluate whether the agent properly asked important property-selling questions.

        Check for:

        - Budget discussion
        - Property location preference
        - BHK preference
        - Investment vs self-use
        - Family requirements
        - Timeline to buy
        - Site visit offer
        - Financing/EMI discussion
        - Objection handling
        - Closing attempt

        Return STRICTLY only 3 most important missed Questions and that too shortly in bullet points. Do not add explanations. Do not add headings.:

        Score: <number>(over all and not separately)

        Missed Questions:
        - Missed Questions explanation
        - point

"""

    response = llm.invoke(prompt)

    return response