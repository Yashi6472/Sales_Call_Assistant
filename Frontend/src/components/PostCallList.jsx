import { useEffect, useState } from "react";

function PostCallList() {

  const [calls, setCalls] = useState([]);

  const [analysis, setAnalysis] = useState(null);

  const [loading, setLoading] = useState(false);

  const [selectedModules, setSelectedModules] = useState({
    summary: true,
    callStage: true,
    leadQuality: true,
    objections: true,
    risks: true,
    buyerSignals: true,
    transcript: true,
    dealProbability: true,
    bant: true,
    agentScore: true,
  });

  const [prompts, setPrompts] = useState({

    summary: "Generate concise property sales summary",

    buyerIntent: "Analyze buyer intent signals",

    objections: "Find customer objections",

    risks: "Detect risky signals",

    bant: "Analyze call using BANT framework",

    agentScore: "Evaluate real estate sales agent performance",

  });


  // Fetch Calls

  useEffect(() => {

    fetch("http://127.0.0.1:8000/api/post-calls")

      .then((response) => response.json())

      .then((data) => {

        console.log(data);

        setCalls(data);

      })

      .catch((error) => {

        console.error(error);

      });

  }, []);


  // Analyze Call

  const analyzeCall = async (callData) => {

    setLoading(true);

    try {

      const response = await fetch(
        "http://127.0.0.1:8000/api/analyze-call",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            ...callData,
            selectedModules,
            prompts,
          }),
        }
      );

      const data = await response.json();

      console.log(data);

      setAnalysis(data);

      console.log("Analysis Response:", data);

      setLoading(false);

    } catch (error) {

      console.error(error);

      setLoading(false);

    }
  };


  return (

    <div style={{ padding: "20px" }}>

      <h2>Select Analysis Modules</h2>

      <div style={{ marginBottom: "20px" }}>

        {/* Summary */}

        <label>
          <input
            type="checkbox"
            checked={selectedModules.summary}
            onChange={() =>
              setSelectedModules({
                ...selectedModules,
                summary: !selectedModules.summary,
              })
            }
          />
          Summary
        </label>

        <br />


        {/* Call Stage */}

        <label>
          <input
            type="checkbox"
            checked={selectedModules.callStage}
            onChange={() =>
              setSelectedModules({
                ...selectedModules,
                callStage: !selectedModules.callStage,
              })
            }
          />
          Call Stage
        </label>

        <br />


        {/* Lead Quality */}

        <label>
          <input
            type="checkbox"
            checked={selectedModules.leadQuality}
            onChange={() =>
              setSelectedModules({
                ...selectedModules,
                leadQuality: !selectedModules.leadQuality,
              })
            }
          />
          Lead Quality
        </label>

        <br />


        {/* Objections */}

        <label>
          <input
            type="checkbox"
            checked={selectedModules.objections}
            onChange={() =>
              setSelectedModules({
                ...selectedModules,
                objections: !selectedModules.objections,
              })
            }
          />
          Objection Intelligence
        </label>

        <br />


        {/* Risks */}

        <label>
          <input
            type="checkbox"
            checked={selectedModules.risks}
            onChange={() =>
              setSelectedModules({
                ...selectedModules,
                risks: !selectedModules.risks,
              })
            }
          />
          Risk Intelligence
        </label>

        <br />


        {/* Buyer Intent */}

        <label>
          <input
            type="checkbox"
            checked={selectedModules.buyerSignals}
            onChange={() =>
              setSelectedModules({
                ...selectedModules,
                buyerSignals: !selectedModules.buyerSignals,
              })
            }
          />
          Buyer Intent
        </label>

        <br />


        {/* Transcript */}

        <label>
          <input
            type="checkbox"
            checked={selectedModules.transcript}
            onChange={() =>
              setSelectedModules({
                ...selectedModules,
                transcript: !selectedModules.transcript,
              })
            }
          />
          Transcript
        </label>

        <br />


        {/* BANT */}

        <label>
          <input
            type="checkbox"
            checked={selectedModules.bant}
            onChange={() =>
              setSelectedModules({
                ...selectedModules,
                bant: !selectedModules.bant,
              })
            }
          />
          BANT Analysis
        </label>

        <br />


        {/* Deal Probability */}

        <label>
          <input
            type="checkbox"
            checked={selectedModules.dealProbability}
            onChange={() =>
              setSelectedModules({
                ...selectedModules,
                dealProbability: !selectedModules.dealProbability,
              })
            }
          />
          Deal Probability
        </label>

        <br />


        {/* Agent Score */}

        <label>
          <input
            type="checkbox"
            checked={selectedModules.agentScore}
            onChange={() =>
              setSelectedModules({
                ...selectedModules,
                agentScore: !selectedModules.agentScore,
              })
            }
          />
          Agent Score
        </label>

      </div>


      {/* Agent Prompts */}

      <h2>Agent Prompts</h2>

      <div style={{ marginBottom: "30px" }}>

        <h3>Summary Prompt</h3>

        <textarea
          rows={4}
          cols={80}
          value={prompts.summary}
          onChange={(e) =>
            setPrompts({
              ...prompts,
              summary: e.target.value,
            })
          }
        />

        <br /><br />


        <h3>Buyer Intent Prompt</h3>

        <textarea
          rows={4}
          cols={80}
          value={prompts.buyerIntent}
          onChange={(e) =>
            setPrompts({
              ...prompts,
              buyerIntent: e.target.value,
            })
          }
        />

        <br /><br />


        <h3>Objections Prompt</h3>

        <textarea
          rows={4}
          cols={80}
          value={prompts.objections}
          onChange={(e) =>
            setPrompts({
              ...prompts,
              objections: e.target.value,
            })
          }
        />

        <br /><br />


        <h3>Risks Prompt</h3>

        <textarea
          rows={4}
          cols={80}
          value={prompts.risks}
          onChange={(e) =>
            setPrompts({
              ...prompts,
              risks: e.target.value,
            })
          }
        />

        <br /><br />


        <h3>BANT Prompt</h3>

        <textarea
          rows={4}
          cols={80}
          value={prompts.bant}
          onChange={(e) =>
            setPrompts({
              ...prompts,
              bant: e.target.value,
            })
          }
        />

        <br /><br />


        <h3>Agent Score Prompt</h3>

        <textarea
          rows={6}
          cols={80}
          value={prompts.agentScore}
          onChange={(e) =>
            setPrompts({
              ...prompts,
              agentScore: e.target.value,
            })
          }
        />

      </div>


      {/* Completed Calls */}

      <h2>Completed Calls</h2>

      <p>Total Calls: {calls.length}</p>

      {calls.map((call) => (

        <div
          key={call.id}
          style={{
            border: "1px solid gray",
            padding: "20px",
            marginTop: "20px",
            borderRadius: "8px",
          }}
        >

          <h3>{call.leadName}</h3>

          <p>
            <strong>Lead Type:</strong> {call.leadType}
          </p>

          <p>
            <strong>Stage:</strong> {call.leadStage}
          </p>

          <p>
            <strong>Quality:</strong> {call.leadQuality}
          </p>

          <p>
            <strong>Summary:</strong> {call.callSummary}
          </p>

          <p>
            <strong>Status:</strong> {call.analysisStatus}
          </p>

          <button
            onClick={() => analyzeCall(call)}
            disabled={loading}
          >

            {loading ? "Analyzing..." : "Analyze Call"}

          </button>

        </div>

      ))}


      {/* Analysis Result */}

      {analysis && (

        <div
          style={{
            border: "2px solid blue",
            padding: "20px",
            marginTop: "30px",
            borderRadius: "8px",
          }}
        >

          <h2>Analysis Result</h2>


          {/* Summary */}

          {analysis.summary &&
          analysis.summary !== "Summary module skipped" && (

            <div>

              <p>
                <strong>Summary:</strong>
              </p>

              <p>{analysis.summary}</p>

              <hr />

            </div>

          )}


          {/* Call Stage */}

          {analysis.call_stage_analysis &&
          analysis.call_stage_analysis !== "Stage module skipped" && (

            <div>

              <p>
                <strong>Call Stage:</strong>
              </p>

              <p>{analysis.call_stage_analysis}</p>

              <hr />

            </div>

          )}


          {/* Lead Quality */}

          {analysis.lead_quality &&
          analysis.lead_quality !== "Lead quality module skipped" && (

            <div>

              <p>
                <strong>Lead Quality:</strong>
              </p>

              <p>{analysis.lead_quality}</p>

              <hr />

            </div>

          )}


          {/* Deal Probability */}

          {analysis.deal_probability &&
          analysis.deal_probability !== "Deal probability skipped" && (

            <div>

              <p>
                <strong>Deal Probability:</strong>
              </p>

              <p>
              {typeof analysis.deal_probability === "number"
                ? `${analysis.deal_probability}%`
                : analysis.deal_probability}
            </p>

              <hr />

            </div>

          )}


          {/* Objections */}

          {analysis?.objections?.length > 0 &&
          analysis.objections[0] !== "Objection module skipped" && (

            <div>

              <p>
                <strong>Objections:</strong>
              </p>

              <ul>

                {analysis.objections.map((obj, index) => (

                  <li key={index}>{obj}</li>

                ))}

              </ul>

              <hr />

            </div>

          )}


          {/* Risks */}

          {analysis?.risks?.length > 0 &&
          analysis.risks[0] !== "Risk module skipped" && (

            <div>

              <p>
                <strong>Risks:</strong>
              </p>

              <ul>

                {analysis.risks.map((risk, index) => (

                  <li key={index}>{risk}</li>

                ))}

              </ul>

              <hr />

            </div>

          )}


          {/* Buyer Signals */}

          {analysis?.buyer_signals?.length > 0 &&
          analysis.buyer_signals[0] !== "Buyer intent skipped" && (

            <div>

              <p>
                <strong>Buyer Signals:</strong>
              </p>

              <ul>

                {analysis.buyer_signals.map((signal, index) => (

                  <li key={index}>{signal}</li>

                ))}

              </ul>

              <hr />

            </div>

          )}


          {/* BANT */}

          {analysis.bant_analysis &&
          analysis.bant_analysis !== "BANT analysis skipped" && (

            <div>

              <p>
                <strong>BANT Analysis:</strong>
              </p>

              <div
                style={{
                  backgroundColor: "#f4f4f4",
                  padding: "10px",
                  borderRadius: "8px",
                  color: "black",
                  whiteSpace: "pre-wrap",
                }}
              >

                {analysis.bant_analysis}

              </div>

              <hr />

            </div>

          )}


          
          {/* Agent Score */}

          {analysis.agent_score &&
          analysis.agent_score !== "Agent scoring skipped" && (

            <div>

              <p>
                <strong>Agent Score:</strong>
              </p>

              {typeof analysis.agent_score === "object" ? (
                <>
                  <p>
                    Score: {analysis.agent_score.score}
                  </p>

                  <p>
                    Rating: {analysis.agent_score.rating}
                  </p>
                </>
              ) : (
                <p>{analysis.agent_score}</p>
              )}

              <hr />

            </div>

          )}

          {/* Transcript */}

          {analysis.transcript &&
          analysis.transcript !== "Transcript skipped" && (

            <div>

              <p>
                <strong>Transcript:</strong>
              </p>

              <div
                style={{
                  backgroundColor: "#f4f4f4",
                  color: "black",
                  padding: "10px",
                  borderRadius: "8px",
                  whiteSpace: "pre-wrap",
                }}
              >

                {analysis.transcript}

              </div>

            </div>

          )}

        </div>

      )}

    </div>

  );

}

export default PostCallList;