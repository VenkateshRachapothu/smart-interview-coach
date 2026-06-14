import theme from "../styles/theme";

function Footer() {
  return (
    <footer
      style={{
        textAlign: "center",
        padding: theme.spacing.md,
        color: theme.muted,
        fontSize: 14,
        borderTop: `1px solid ${theme.border}`,
        marginTop: "auto",
        background: theme.card,
      }}
    >
      Smart Interview Coach © 2026
    </footer>
  );
}

export default Footer;
