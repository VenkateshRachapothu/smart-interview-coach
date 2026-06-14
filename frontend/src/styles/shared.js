import theme from "./theme";

export const textareaStyle = {
  width: "100%",
  minHeight: 120,
  padding: theme.spacing.sm,
  borderRadius: theme.radius.sm,
  border: `1px solid ${theme.border}`,
  fontSize: 15,
  lineHeight: 1.6,
  fontFamily: "inherit",
  resize: "vertical",
  boxSizing: "border-box",
};

export const preStyle = {
  whiteSpace: "pre-wrap",
  background: theme.background,
  padding: theme.spacing.sm,
  borderRadius: theme.radius.sm,
  border: `1px solid ${theme.border}`,
  fontSize: 14,
  lineHeight: 1.6,
  margin: 0,
};

export const sectionLabelStyle = {
  fontSize: 13,
  fontWeight: 600,
  color: theme.muted,
  textTransform: "uppercase",
  letterSpacing: "0.04em",
  marginBottom: theme.spacing.xs,
};

export const gridTwoCol = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: theme.spacing.sm,
};

export const statRow = {
  display: "flex",
  gap: theme.spacing.sm,
  flexWrap: "wrap",
  marginBottom: theme.spacing.md,
};

export const badgeStyle = (color = theme.primaryLight, textColor = theme.primary) => ({
  background: color,
  color: textColor,
  padding: "8px 14px",
  borderRadius: theme.radius.sm,
  fontWeight: 600,
  fontSize: 14,
});

export const getScoreColor = (score) => {
  const num = Number(score);
  if (num >= 8) return theme.success;
  if (num >= 5) return theme.warning;
  return theme.danger;
};
