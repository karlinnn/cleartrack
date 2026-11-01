export default function ServicesLoading() {
  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "56px 24px 80px",
      }}
      aria-busy="true"
      aria-label="Loading services"
    >
      <Skeleton width="90px" height="14px" mb="32px" />
      <Skeleton width="30%" height="40px" mb="12px" />
      <Skeleton width="55%" height="16px" mb="4px" />
      <Skeleton width="45%" height="16px" mb="0" />

      <div style={{ borderBottom: "1px solid var(--color-rule)", marginBottom: "0", marginTop: "20px" }} />

      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          style={{
            display: "grid",
            gridTemplateColumns: "80px 1fr",
            gap: "24px",
            padding: "24px 0",
            borderBottom: "1px solid var(--color-rule)",
          }}
        >
          <Skeleton width="80px" height="80px" />
          <div>
            <Skeleton width="38%" height="18px" mb="10px" />
            <Skeleton width="72%" height="14px" mb="6px" />
            <Skeleton width="50%" height="14px" />
          </div>
        </div>
      ))}
    </div>
  );
}

function Skeleton({ width, height, mb }: { width: string; height: string; mb?: string }) {
  return (
    <div style={{ width, height, backgroundColor: "var(--color-rule)", marginBottom: mb ?? "0", borderRadius: "2px" }} aria-hidden="true" />
  );
}
