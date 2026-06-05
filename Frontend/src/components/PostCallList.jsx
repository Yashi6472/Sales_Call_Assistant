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
  });

  const [prompts, setPrompts] = useState({

    summary: "Generate concise property sales summary",

    buyerIntent: "Analyze buyer intent signals",

    objections: "Find customer objections",

    risks: "Detect risky signals",

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


        {/* Buyer Signals */}

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

    {analysis.summary && (

      <div>

        <p>
          <strong>Summary:</strong>
        </p>

        <p>{analysis.summary}</p>

        <hr />

      </div>

    )}


    {/* Call Stage */}

    {analysis.call_stage_analysis && (

      <div>

        <p>
          <strong>Call Stage:</strong>
        </p>

        <p>{analysis.call_stage_analysis}</p>

        <hr />

      </div>

    )}


    {/* Lead Quality */}

    {analysis.lead_quality && (

      <div>

        <p>
          <strong>Lead Quality:</strong>
        </p>

        <p>{analysis.lead_quality}</p>

        <hr />

      </div>

    )}


    {/* Deal Probability */}

    {analysis.deal_probability && (

      <div>

        <p>
          <strong>Deal Probability:</strong>
        </p>

        <p>{analysis.deal_probability}%</p>

        <hr />

      </div>

    )}


    {/* Objections */}

    {analysis?.objections?.length > 0 && (

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

    {analysis?.risks?.length > 0 && (

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

    {analysis?.buyer_signals?.length > 0 && (

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


    {/* Agent Score */}

    {analysis.agent_score && (

      <div>

        <p>
          <strong>Agent Score:</strong>
        </p>

        <p>{analysis.agent_score}</p>

        <hr />

      </div>

    )}


    {/* Transcript */}

    {analysis.transcript && (

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