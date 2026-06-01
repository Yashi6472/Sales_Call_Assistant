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

    console.log({
      ...callData,
      selectedModules,
    });

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


      <h2>Completed Calls</h2>


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


          {/* Dashboard Row */}

          <div
            style={{
              display: "flex",
              gap: "20px",
              flexWrap: "wrap",
              marginBottom: "30px",
            }}
          >

            {/* Deal Probability Card */}

            {analysis.deal_probability && (

              <div
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "12px",
                  padding: "20px",
                  marginBottom: "20px",
                  boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
                  backgroundColor: "#f9f9f9",
                  flex: "1",
                  minWidth: "250px",
                }}
              >

                <p
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    marginBottom: "10px",
                    color: "black",
                  }}
                >
                  Deal Probability
                </p>

                <p
                  style={{
                    fontSize: "40px",
                    fontWeight: "bold",
                    color: "green",
                  }}
                >
                  {analysis.deal_probability}%
                </p>

              </div>

            )}


            {/* Lead Quality Card */}

            {analysis.lead_quality && (

              <div
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "12px",
                  padding: "20px",
                  marginBottom: "20px",
                  boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
                  backgroundColor: "#f9f9f9",
                  flex: "1",
                  minWidth: "250px",
                }}
              >

                <p
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    marginBottom: "10px",
                    color: "black",
                  }}
                >
                  Lead Quality
                </p>

                <p
                  style={{
                    fontSize: "32px",
                    fontWeight: "bold",
                    color: "blue",
                  }}
                >
                  {analysis.lead_quality}
                </p>

              </div>

            )}


            {/* Agent Performance Card */}

            {analysis.agent_score && (

              <div
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "12px",
                  padding: "20px",
                  marginBottom: "20px",
                  boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
                  backgroundColor: "#f9f9f9",
                  flex: "1",
                  minWidth: "300px",
                }}
              >

                <p
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    marginBottom: "10px",
                    color: "black",
                  }}
                >
                  Agent Performance
                </p>

                <div
                  style={{
                    whiteSpace: "pre-wrap",
                    color: "black",
                  }}
                >
                  {analysis.agent_score}
                </div>

              </div>

            )}

          </div>



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


          {/* Objections */}

          {analysis.objections.length > 0 && (

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


          {/* Risk Flags */}

          {analysis.risk_flags.length > 0 && (

            <div>

              <p>
                <strong>Risk Flags:</strong>
              </p>

              <ul>
                {analysis.risk_flags.map((risk, index) => (
                  <li key={index}>{risk}</li>
                ))}
              </ul>

              <hr />

            </div>

          )}


          {/* Buyer Signals */}

          {analysis.buyer_signals.length > 0 && (

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