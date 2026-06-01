from typing import TypedDict

from langgraph.graph import StateGraph, END

from app.agents.objection_agent import analyze_objections
from app.agents.risk_agent import analyze_risks
from app.agents.buyer_intent_agent import analyze_buyer_intent
from app.agents.summary_agent import generate_summary
from app.agents.stage_agent import analyze_stage
from app.agents.agent_scoring_agent import (
    analyze_agent_score
)
from app.agents.lead_quality_agent import (
    analyze_lead_quality
)

from app.agents.deal_probability_agent import (
    analyze_deal_probability
)

class GraphState(TypedDict):
    call: dict
    transcript: str
    selectedModules: dict
    summary: str
    objections: list
    risks: list
    buyer_signals: list
    call_stage_analysis: str
    lead_quality: str
    deal_probability: str
    agent_score: str


# Summary Agent
def summary_node(state):

    if not state["selectedModules"]["summary"]:
        return {
            "summary": "Summary module skipped"
        }

    summary = generate_summary(state["call"])

    return {
        "summary": summary
    }
def deal_probability_node(state):

    probability = analyze_deal_probability(
        state["transcript"]
    )

    return {
        "deal_probability": probability
    }
def stage_node(state):

    if not state["selectedModules"]["callStage"]:
        return {
            "call_stage_analysis": ""
        }

    stage_analysis = analyze_stage(
        state["call"]
    )

    return {
        "call_stage_analysis": stage_analysis
    }
def lead_quality_node(state):

    if not state["selectedModules"]["leadQuality"]:
        return {
            "lead_quality": ""
        }

    quality = analyze_lead_quality(
        state["call"]
    )

    return {
        "lead_quality": quality
    }


# Objection Agent
def objection_node(state):

    if not state["selectedModules"]["objections"]:
        return {
            "objections": []
        }

    objections = analyze_objections(
        state["transcript"]
    )

    return {
        "objections": objections
    }


# Risk Agent
def risk_node(state):

    if not state["selectedModules"]["risks"]:
        return {
            "risks": []
        }

    risks = analyze_risks(
        state["transcript"]
    )

    return {
        "risks": risks
    }


# Buyer Intent Agent
def buyer_intent_node(state):

    if not state["selectedModules"]["buyerSignals"]:
        return {
            "buyer_signals": []
        }

    buyer_signals = analyze_buyer_intent(
        state["transcript"]
    )

    return {
        "buyer_signals": buyer_signals
    }

def agent_score_node(state):

    score = analyze_agent_score(
        state["transcript"]
    )

    return {
        "agent_score": score
    }

# Build Graph
graph = StateGraph(GraphState)

graph.add_node("summary", summary_node)

graph.add_node("stage", stage_node)

graph.add_node(
    "deal_probability",
    deal_probability_node
)

graph.add_node(
    "lead_quality",
    lead_quality_node
)

graph.add_node("objection", objection_node)

graph.add_node("risk", risk_node)

graph.add_node("buyer_intent", buyer_intent_node)

graph.add_node(
    "agent_score",
    agent_score_node
)


# Entry Point
graph.set_entry_point("summary")


# Flow
graph.add_edge("summary", "stage")

graph.add_edge("stage", "lead_quality")

graph.add_edge("lead_quality", "objection")

graph.add_edge("objection", "risk")

graph.add_edge("risk", "buyer_intent")

graph.add_edge(
    "buyer_intent",
    "deal_probability"
)

graph.add_edge(
    "deal_probability",
    "agent_score"
)

graph.add_edge(
    "agent_score",
    END
)

# Compile Graph
app_graph = graph.compile()