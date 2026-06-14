const theme = {
  primary: "#2563eb",
  primaryHover: "#1d4ed8",
  primaryLight: "#eff6ff",
  secondary: "#1e293b",
  success: "#16a34a",
  successLight: "#ecfdf5",
  warning: "#d97706",
  warningLight: "#fffbeb",
  danger: "#dc2626",
  dangerLight: "#fef2f2",
  background: "#f8fafc",
  card: "#ffffff",
  border: "#e2e8f0",
  text: "#0f172a",
  muted: "#64748b",
  spacing: {
    xs: 8,
    sm: 16,
    md: 24,
    lg: 32,
    xl: 40,
  },
  radius: {
    sm: 8,
    md: 12,
    lg: 16,
  },
  shadow: {
    card: "0 2px 8px rgba(0, 0, 0, 0.08)",
    elevated: "0 4px 16px rgba(0, 0, 0, 0.1)",
  },
  maxWidth: 1100,
};
const lightTheme = {
  background: "#f8fafc",
  card: "#ffffff",
  text: "#0f172a",
  muted: "#64748b",
  border: "#e2e8f0",
  primary: "#2563eb",
  primaryLight: "#dbeafe",
  success: "#16a34a",
};

const darkTheme = {
  background: "#0f172a",
  card: "#1e293b",
  text: "#f8fafc",
  muted: "#94a3b8",
  border: "#334155",
  primary: "#3b82f6",
  primaryLight: "#1e40af",
  success: "#22c55e",
};

export {
  lightTheme,
  darkTheme,
};
export default theme;
