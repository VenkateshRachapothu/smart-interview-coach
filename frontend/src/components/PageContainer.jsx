import theme from "../styles/theme";

function PageContainer({ children, style = {} }) {
  return (
    <main
      style={{
        maxWidth: theme.maxWidth,
        margin: "0 auto",
        padding: `${theme.spacing.lg}px ${theme.spacing.md}px`,
        width: "100%",
        boxSizing: "border-box",
        flex: 1,
        textAlign: "left",
        ...style,
      }}
    >
      {children}
    </main>
  );
}

export default PageContainer;
