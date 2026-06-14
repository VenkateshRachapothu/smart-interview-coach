import theme from "../styles/theme";

function SkillChip({ label }) {
  return (
    <span
      style={{
        display: "inline-block",
        background: theme.primaryLight,
        color: theme.primary,
        padding: "6px 12px",
        borderRadius: 999,
        fontSize: 13,
        fontWeight: 600,
        marginRight: 8,
        marginBottom: 8,
      }}
    >
      {label}
    </span>
  );
}

export default SkillChip;
