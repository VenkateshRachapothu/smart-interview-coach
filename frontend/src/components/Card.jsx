import theme from "../styles/theme";

function Card({ children, style = {}, title }) {
  return (
    <div
      style={{
        background: theme.card,
        borderRadius: theme.radius.md,
        padding: theme.spacing.lg,
        boxShadow: theme.shadow.card,
        border: `1px solid ${theme.border}`,
        marginBottom: theme.spacing.md,
        textAlign: "left",
        ...style,
      }}
    >
      {title && (
        <h2
          style={{
            marginTop: 0,
            marginBottom: theme.spacing.sm,
            fontSize: 20,
            color: theme.text,
          }}
        >
          {title}
        </h2>
      )}
      {children}
    </div>
  );
}

export default Card;
