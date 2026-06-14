import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageShell from "../components/PageShell";
import Card from "../components/Card";
import Button from "../components/Button";
import theme from "../styles/theme";
import { badgeStyle } from "../styles/shared";

function History() {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const token =
  localStorage.getItem("token");
    fetch("https://smart-interview-coach-ozbd.onrender.com/history",
      {
    headers: {
      Authorization:
        `Bearer ${token}`
    }
  }
    )
      .then((response) => response.json())
      .then((data) => {

  if (Array.isArray(data)) {
    setHistory(data);
  } else {
    console.error(data);
    setHistory([]);
  }

})
      .catch((error) => console.error(error));
  }, []);

  return (
    <PageShell
      title="Interview History"
      subtitle="View your previous interview attempts and performance"
    >
      {history.length === 0 ? (
        <Card>
          <p style={{ color: theme.muted, marginBottom: theme.spacing.md }}>
            No interview history found. Complete a mock interview to see your
            results here.
          </p>
          <Button onClick={() => navigate("/upload")}>
            Start your first interview
          </Button>
        </Card>
      ) : (
        history.map((item) => (
          <Card key={item.id}>
            <h2
              style={{
                marginTop: 0,
                marginBottom: theme.spacing.sm,
                color: theme.text,
                fontSize: 20,
              }}
            >
              {item.role}
            </h2>

            <div
              style={{
                display: "flex",
                gap: theme.spacing.sm,
                flexWrap: "wrap",
                marginBottom: theme.spacing.sm,
              }}
            >
              <span style={badgeStyle(theme.primaryLight, theme.primary)}>
                Average Score: {item.avg_score}
              </span>
              <span style={badgeStyle(theme.background, theme.text)}>
                Date: {new Date(item.created_at).toLocaleString()}
              </span>
            </div>

            <div
              style={{
                background: theme.background,
                padding: theme.spacing.sm,
                borderRadius: theme.radius.sm,
              }}
            >
              <strong>Summary</strong>
              <p
                style={{
                  marginTop: theme.spacing.xs,
                  marginBottom: 0,
                  lineHeight: 1.6,
                  color: theme.text,
                }}
              >
                {item.summary}
              </p>
            </div>
          </Card>
        ))
      )}
    </PageShell>
  );
}

export default History;
