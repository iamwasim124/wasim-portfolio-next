export default function Home() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "20px",
        background: "#f9f9f9",
      }}
    >
      <h1 style={{ fontSize: "36px", marginBottom: "10px" }}>
        🚧 Site Under Maintenance
      </h1>

      <p style={{ fontSize: "18px", maxWidth: "500px", color: "#555" }}>
        My portfolio is currently being updated. Please check back soon.
      </p>

      <p style={{ marginTop: "20px", color: "#888" }}>— Mohammed Wasim</p>
    </div>
  );
}
