import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";

import Layout from "../components/Layout";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import Button from "../components/Button";

import theme from "../styles/theme";

function Login() {
  const navigate = useNavigate();

  const { login } =
    useContext(AuthContext);

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response =
        await fetch(
          "https://smart-interview-coach-ozbd.onrender.com/login",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              email,
              password,
            }),
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        alert(
          data.error ||
            "Login failed"
        );
        return;
      }

      login(
        data.user,
        data.token
      );

      navigate("/upload");

    } catch (error) {
      console.error(error);

      alert(
        "Unable to login"
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
            Welcome Back
          </h1>

          <form
            onSubmit={handleLogin}
          >
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              required
              style={inputStyle}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              required
              style={inputStyle}
            />

            <Button
              type="submit"
              disabled={loading}
            >
              {loading
                ? "Logging in..."
                : "Login"}
            </Button>
          </form>

          <p
            style={{
              textAlign: "center",
              marginTop: "20px",
            }}
          >
            Don't have an
            account?{" "}
            <Link to="/signup">
              Signup
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

export default Login;