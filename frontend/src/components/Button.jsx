import theme from "../styles/theme";

const variants = {
  primary: {
    backgroundColor: theme.primary,
    color: "#ffffff",
    border: "none",
  },
  secondary: {
    backgroundColor: theme.card,
    color: theme.text,
    border: `1px solid ${theme.border}`,
  },
  ghost: {
    backgroundColor: "transparent",
    color: theme.primary,
    border: "none",
  },
};

function Button({
  children,
  variant = "primary",
  disabled = false,
  onClick,
  type = "button",
  style = {},
}) {
  const base = {
    padding: "12px 20px",
    borderRadius: theme.radius.sm,
    cursor: disabled ? "not-allowed" : "pointer",
    fontSize: 15,
    fontWeight: 600,
    opacity: disabled ? 0.6 : 1,
    transition: "background-color 0.15s ease, opacity 0.15s ease",
    ...variants[variant],
    ...style,
  };

  return (
    <button
      type={type}
      style={base}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
