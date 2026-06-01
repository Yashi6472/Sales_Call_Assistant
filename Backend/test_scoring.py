from app.agents.property_sales_scoring_agent import run_property_sales_scoring

sample_transcript = """
Agent: What is your budget?
Customer: Around 80 lakhs.

Agent: Which location are you looking for?
Customer: Baner area.

Agent: Would you like to schedule a site visit this weekend?
"""

result = run_property_sales_scoring(sample_transcript)

print(result)