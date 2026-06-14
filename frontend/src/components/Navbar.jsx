import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import theme from "../styles/theme";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import {
  ThemeContext
}
from "../context/ThemeContext";
const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/upload", label: "Upload" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/history", label: "History" },
  { to: "/profile", label: "Profile" },
];

function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const {
  darkMode,
  toggleTheme,
} = useContext(
  ThemeContext
);

const { logout } =
  useContext(AuthContext);
  const handleLogout = () => {

  logout();

  navigate("/login");
};
const user =
  JSON.parse(
    localStorage.getItem("user")
  );

  const linkStyle = (path) => ({
    color: location.pathname === path ? theme.primary : theme.text,
    textDecoration: "none",
    fontWeight: location.pathname === path ? 600 : 500,
    fontSize: 15,
    paddingBottom: 4,
    borderBottom:
      location.pathname === path
        ? `2px solid ${theme.primary}`
        : "2px solid transparent",
  });

  return (
    <nav
      style={{
        background: theme.card,
        padding: `${theme.spacing.sm}px ${theme.spacing.md}px`,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: `1px solid ${theme.border}`,
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <Link
        to="/"
        style={{
          color: theme.primary,
          textDecoration: "none",
          fontSize: 20,
          fontWeight: 700,
          margin: 0,
        }}
      >
        Smart Interview Coach
      </Link>

      <button
        type="button"
        aria-label="Toggle navigation menu"
        onClick={() => setMenuOpen(!menuOpen)}
        style={{
          display: "none",
          background: "transparent",
          border: `1px solid ${theme.border}`,
          borderRadius: theme.radius.sm,
          padding: "8px 12px",
          cursor: "pointer",
          fontSize: 18,
        }}
        className="nav-toggle"
      >
        ☰
      </button>

      <div
  className="nav-links"
  style={{
    display: "flex",
    gap: theme.spacing.md,
    alignItems: "center",
  }}
>
  {NAV_LINKS.map((link) => (
    <Link
      key={link.to}
      to={link.to}
      style={linkStyle(link.to)}
      onClick={() => setMenuOpen(false)}
    >
      {link.label}
    </Link>
  ))}

  {user && (
    <>
      <span
        style={{
          color: theme.text,
          fontWeight: 600,
        }}
      >
        Welcome, {user.name}
      </span>

      <button
        onClick={handleLogout}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          fontWeight: 600,
          color: theme.primary,
        }}
      >
        Logout
      </button>
    </>
  )}

 
</div>

      <style>{`
        @media (max-width: 768px) {
          .nav-toggle { display: block !important; }
          .nav-links {
            display: ${menuOpen ? "flex" : "none"} !important;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: ${theme.card};
            border-bottom: 1px solid ${theme.border};
            padding: ${theme.spacing.sm}px ${theme.spacing.md}px;
            gap: ${theme.spacing.sm}px !important;
            align-items: flex-start !important;
          }
          nav { position: relative; flex-wrap: wrap; }
        }
      `}</style>
    </nav>
  );
}

export default Navbar;
