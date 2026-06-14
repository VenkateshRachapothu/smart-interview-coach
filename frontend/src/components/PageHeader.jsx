import theme from "../styles/theme";

function PageHeader({ title, subtitle }) {
  return (
    <header
      style={{
        marginBottom: theme.spacing.lg,
        textAlign: "left",
      }}
    >
      <h1
        style={{
          margin: 0,
          marginBottom: subtitle ? theme.spacing.xs : 0,
          fontSize: 32,
          fontWeight: 700,
          color: theme.text,
          letterSpacing: "-0.02em",
        }}
      >
        {title}
      </h1>
      {subtitle && (
        <p
          style={{
            margin: 0,
            color: theme.muted,
            fontSize: 16,
            lineHeight: 1.5,
          }}
        >
          {subtitle}
        </p>
      )}
    </header>
  );
}

export default PageHeader;
