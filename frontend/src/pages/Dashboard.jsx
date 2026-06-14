import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageShell from "../components/PageShell";
import StatCard from "../components/StatCard";
import Card from "../components/Card";
import Button from "../components/Button";
import theme from "../styles/theme";
import { statRow } from "../styles/shared";

function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ total: 0, average: 0, best: 0 });

  useEffect(() => {
    const token =
  localStorage.getItem("token");
    fetch("http://127.0.0.1:5000/dashboard",
       {
    headers: {
      Authorization:
        `Bearer ${token}`
    }
  }

    )
      .then((response) => response.json())
      .then((data) => setStats(data))
      .catch((error) => console.error(error));
  }, []);

  const isEmpty = stats.total === 0;

  return (
    <PageShell
      title="Dashboard"
      subtitle="Interview performance overview"
    >
      {isEmpty ? (
        <Card>
          <p style={{ color: theme.muted, marginBottom: theme.spacing.md }}>
            You haven't completed any interviews yet. Start your first mock
            interview to track your progress here.
          </p>
          <Button onClick={() => navigate("/upload")}>
            Start your first interview
          </Button>
        </Card>
      ) : (
        <div style={statRow}>
          <StatCard label="Total Interviews" value={stats.total} />
          <StatCard label="Average Score" value={stats.average} />
          <StatCard label="Best Score" value={stats.best} accent={theme.success} />
        </div>
      )}
    </PageShell>
  );
}

export default Dashboard;
