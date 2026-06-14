import theme from "../styles/theme";

function Layout({ children }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: theme.background,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {children}
    </div>
  );
}

export default Layout;
