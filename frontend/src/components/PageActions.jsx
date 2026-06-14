import theme from "../styles/theme";

function PageActions({ children, sticky = false }) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: theme.spacing.sm,
        marginTop: theme.spacing.lg,
        paddingTop: theme.spacing.md,
        borderTop: `1px solid ${theme.border}`,
        ...(sticky
          ? {
              position: "sticky",
              bottom: 0,
              background: theme.background,
              paddingBottom: theme.spacing.sm,
              zIndex: 10,
            }
          : {}),
      }}
    >
      {children}
    </div>
  );
}

export default PageActions;
