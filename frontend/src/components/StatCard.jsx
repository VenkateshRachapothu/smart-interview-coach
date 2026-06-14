import theme from "../styles/theme";

function StatCard({ label, value, accent }) {
  return (
    <div
      style={{
        background: theme.card,
        padding: theme.spacing.md,
        borderRadius: theme.radius.md,
        boxShadow: theme.shadow.card,
        border: `1px solid ${theme.border}`,
        minWidth: 200,
        flex: "1 1 200px",
        textAlign: "center",
      }}
    >
      <p
        style={{
          margin: 0,
          marginBottom: theme.spacing.xs,
          color: theme.muted,
          fontSize: 14,
          fontWeight: 500,
        }}
      >
        {label}
      </p>
      <p
        style={{
          margin: 0,
          fontSize: 36,
          fontWeight: 700,
          color: accent || theme.text,
          lineHeight: 1.1,
        }}
      >
        {value}
      </p>
    </div>
  );
}

export default StatCard;
