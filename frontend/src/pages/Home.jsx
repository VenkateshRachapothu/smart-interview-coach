import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageContainer from "../components/PageContainer";
import Button from "../components/Button";
import Card from "../components/Card";
import theme from "../styles/theme";

const STEPS = [
  { title: "Upload Resume", desc: "Extract skills and run ATS analysis" },
  { title: "Select Role", desc: "Choose your target interview role" },
  { title: "Mock Interview", desc: "Answer AI-generated questions" },
];

function Home() {
  const navigate = useNavigate();

  return (
    <Layout>
      <Navbar />
      <PageContainer>
        <section
          style={{
            textAlign: "center",
            padding: `${theme.spacing.xl}px 0`,
          }}
        >
          <h1
            style={{
              fontSize: "clamp(32px, 5vw, 48px)",
              fontWeight: 800,
              color: theme.text,
              marginBottom: theme.spacing.sm,
              letterSpacing: "-0.03em",
            }}
          >
            Smart Interview Coach
          </h1>
          <p
            style={{
              color: theme.muted,
              fontSize: 18,
              maxWidth: 560,
              margin: `0 auto ${theme.spacing.lg}px`,
              lineHeight: 1.6,
            }}
          >
            AI-powered mock interviews for campus placements. Upload your resume,
            practice role-specific questions, and get detailed feedback.
          </p>
          <Button onClick={() => navigate("/upload")}>
            Start Interview
          </Button>
        </section>

        <section style={{ marginBottom: theme.spacing.xl }}>
          <h2
            style={{
              textAlign: "center",
              fontSize: 22,
              marginBottom: theme.spacing.md,
              color: theme.text,
            }}
          >
            How it works
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: theme.spacing.sm,
            }}
          >
            {STEPS.map((step, index) => (
              <Card key={step.title} style={{ marginBottom: 0 }}>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    background: theme.primaryLight,
                    color: theme.primary,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    marginBottom: theme.spacing.sm,
                  }}
                >
                  {index + 1}
                </div>
                <h3 style={{ fontSize: 17, marginBottom: 8, color: theme.text }}>
                  {step.title}
                </h3>
                <p style={{ color: theme.muted, fontSize: 14, lineHeight: 1.5 }}>
                  {step.desc}
                </p>
              </Card>
            ))}
          </div>
        </section>

        <section
          style={{
            display: "flex",
            justifyContent: "center",
            gap: theme.spacing.sm,
            flexWrap: "wrap",
            paddingBottom: theme.spacing.lg,
          }}
        >
          <Button variant="secondary" onClick={() => navigate("/dashboard")}>
            Dashboard
          </Button>
          <Button variant="ghost" onClick={() => navigate("/history")}>
            Interview History
          </Button>
        </section>
      </PageContainer>
      <Footer />
    </Layout>
  );
}

export default Home;
