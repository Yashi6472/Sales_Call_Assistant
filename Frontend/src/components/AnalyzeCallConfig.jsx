function AnalyzeCallConfig() {
  return (
    <div
      style={{
        border: "1px solid gray",
        padding: "20px",
        marginTop: "20px",
        borderRadius: "8px",
      }}
    >
      <h2>Analyze Call Configuration</h2>

      <div>
        <input type="checkbox" />
        <label> Call Stage Analysis</label>
      </div>

      <div>
        <input type="checkbox" />
        <label> Lead Qualification</label>
      </div>

      <div>
        <input type="checkbox" />
        <label> Objection Intelligence</label>
      </div>

      <div>
        <input type="checkbox" />
        <label> Risk Intelligence</label>
      </div>

      <button style={{ marginTop: "20px" }}>
        Run Analysis
      </button>
    </div>
  );
}

export default AnalyzeCallConfig;