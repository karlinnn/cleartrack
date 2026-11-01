export default function Loading() {
  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "80px 24px",
      }}
      aria-busy="true"
      aria-label="Loading page content"
    >
      {/* Hero skeleton */}
      <div style={{ marginBottom: "48px" }}>
        <Skeleton width="60%" height="44px" mb="16px" />
        <Skeleton width="40%" height="44px" mb="28px" />
        <Skeleton width="45%" height="18px" mb="8px" />
        <Skeleton width="35%" height="18px" mb="32px" />
        <div style={{ display: "flex", gap: "16px" }}>
          <Skeleton width="140px" height="44px" />
          <Skeleton width="220px" height="44px" />
        </div>
      </div>

      {/* Ledger rows */}
      <Skeleton width="100%" height="1px" mb="0" />
      {[1, 2, 3].map((i) => (
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
            <Skeleton width="40%" height="18px" mb="10px" />
            <Skeleton width="70%" height="14px" mb="6px" />
            <Skeleton width="55%" height="14px" />
          </div>
        </div>
      ))}
    </div>
  );
}

function Skeleton({ width, height, mb }: { width: string; height: string; mb?: string }) {
  return (
    <div
      style={{
        width,
        height,
        backgroundColor: "var(--color-rule)",
        marginBottom: mb ?? "0",
        borderRadius: "2px",
      }}
      aria-hidden="true"
    />
  );
}
