import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import Layout from "../components/Layout";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import Button from "../components/Button";
import theme from "../styles/theme";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] =
    useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response =
        await fetch(
          "http://127.0.0.1:5000/signup",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify(
              formData
            ),
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        alert(
          data.error ||
            "Signup failed"
        );
        return;
      }

      alert(
        "Signup successful. Please login."
      );

      navigate("/login");

    } catch (error) {
      console.error(error);

      alert(
        "Unable to signup."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Navbar />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh",
          padding: "20px",
        }}
      >
        <Card
          style={{
            width: "100%",
            maxWidth: "450px",
          }}
        >
          <h1
            style={{
              textAlign: "center",
              marginBottom: "20px",
              color: theme.text,
            }}
          >
            Create Account
          </h1>

          <form
            onSubmit={
              handleSignup
            }
          >
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={
                formData.name
              }
              onChange={
                handleChange
              }
              required
              style={inputStyle}
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={
                formData.email
              }
              onChange={
                handleChange
              }
              required
              style={inputStyle}
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={
                formData.password
              }
              onChange={
                handleChange
              }
              required
              style={inputStyle}
            />

            <Button
              type="submit"
              disabled={loading}
            >
              {loading
                ? "Creating..."
                : "Sign Up"}
            </Button>
          </form>

          <p
            style={{
              textAlign: "center",
              marginTop: "20px",
            }}
          >
            Already have an
            account?{" "}
            <Link to="/login">
              Login
            </Link>
          </p>
        </Card>
      </div>
    </Layout>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "8px",
  border:
    "1px solid #d1d5db",
  fontSize: "15px",
  boxSizing: "border-box",
};

export default Signup;