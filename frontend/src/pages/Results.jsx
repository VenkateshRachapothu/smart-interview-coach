import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { InterviewContext } from "../context/InterviewContext";
import PageShell from "../components/PageShell";
import Card from "../components/Card";
import Button from "../components/Button";
import StatCard from "../components/StatCard";
import PageActions from "../components/PageActions";
import theme from "../styles/theme";
import { preStyle, statRow, badgeStyle, getScoreColor } from "../styles/shared";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

function Results() {
  const navigate = useNavigate();
  const { results = [] } = useContext(InterviewContext);

  const totalScore = results.reduce(
    (sum, item) => sum + Number(item.technical_score || 0),
    0
  );

  const averageScore =
    results.length > 0 ? (totalScore / results.length).toFixed(1) : 0;

  const chartData = results.map((item, index) => ({
    question: `Q${index + 1}`,
    score: item.technical_score,
  }));

  let summary = {};

  try {
    const storedSummary = localStorage.getItem("summary");
    if (storedSummary && storedSummary !== "undefined") {
      summary = JSON.parse(storedSummary);
    }
  } catch (error) {
    console.error("Summary Parse Error:", error);
    summary = {};
  }

  const downloadReport = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/download_report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ results, summary }),
      });

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "Interview_Report.pdf";
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error(error);
      alert("Failed to download report.");
    }
  };

  const recommendationStyle = () => {
    const rec = (summary?.recommendation || "").toLowerCase();
    if (rec.includes("ready") && !rec.includes("almost")) {
      return badgeStyle(theme.successLight, theme.success);
    }
    if (rec.includes("almost")) {
      return badgeStyle(theme.warningLight, theme.warning);
    }
    return badgeStyle(theme.dangerLight, theme.danger);
  };

  return (
    <PageShell
      step={4}
      title="Interview Results"
      subtitle="Your performance summary and detailed feedback"
      actions={
        <PageActions>
          <Button onClick={downloadReport}>Download Report</Button>
          <Button variant="secondary" onClick={() => navigate("/upload")}>
            Start New Interview
          </Button>
          <Button variant="ghost" onClick={() => navigate("/history")}>
            View History
          </Button>
        </PageActions>
      }
    >
      <div style={statRow}>
        <StatCard label="Average Score" value={`${averageScore}/10`} />
        <StatCard label="Questions" value={results.length} />
      </div>

      {chartData.length > 0 && (
        <Card title="Performance Graph">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="question" />
              <YAxis domain={[0, 10]} />
              <Tooltip />
              <Bar dataKey="score" radius={[8, 8, 0, 0]} label={{ position: "top" }}>
                {chartData.map((entry, index) => (
                  <Cell key={index} fill={getScoreColor(entry.score)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>
      )}

      {summary?.summary && (
        <Card title="Overall Analysis">
          {summary.recommendation && (
            <span style={{ ...recommendationStyle(), marginBottom: theme.spacing.sm, display: "inline-block" }}>
              {summary.recommendation}
            </span>
          )}
          <div style={{ display: "grid", gap: theme.spacing.sm, marginTop: theme.spacing.sm }}>
            <p><strong>Summary:</strong> {summary.summary}</p>
            <p><strong>Strengths:</strong> {summary.strengths}</p>
            <p><strong>Weaknesses:</strong> {summary.weaknesses}</p>
            <p><strong>Advice:</strong> {summary.advice}</p>
          </div>
        </Card>
      )}

      {results.map((item, index) => (
        <Card key={index} title={`Question ${index + 1}`}>
          <h3 style={{ fontSize: 15, color: theme.muted, marginBottom: 8 }}>
            Question
          </h3>
          <p style={{ marginBottom: theme.spacing.sm, lineHeight: 1.6 }}>
            {item.question}
          </p>

          <h3 style={{ fontSize: 15, color: theme.muted, marginBottom: 8 }}>
            Your Answer
          </h3>
          <pre style={{ ...preStyle, marginBottom: theme.spacing.sm }}>
            {item.answer || "No answer"}
          </pre>

          <div style={statRow}>
            <span style={badgeStyle(theme.primaryLight, theme.primary)}>
              Technical: {item.technical_score}/10
            </span>
            <span style={badgeStyle(theme.background, theme.text)}>
              Communication: {item.communication_score}/10
            </span>
          </div>

          <h3 style={{ fontSize: 15, color: theme.muted, marginBottom: 8 }}>
            Strengths
          </h3>
          <div
            style={{
              background: theme.successLight,
              padding: theme.spacing.sm,
              borderRadius: theme.radius.sm,
              marginBottom: theme.spacing.sm,
            }}
          >
            <p>{item.strengths}</p>
          </div>

          <h3 style={{ fontSize: 15, color: theme.muted, marginBottom: 8 }}>
            Mistakes
          </h3>
          <div
            style={{
              background: theme.dangerLight,
              padding: theme.spacing.sm,
              borderRadius: theme.radius.sm,
              marginBottom: theme.spacing.sm,
            }}
          >
            <p>{item.mistakes}</p>
          </div>

          <h3 style={{ fontSize: 15, color: theme.muted, marginBottom: 8 }}>
            Improved Version
          </h3>
          <pre style={preStyle}>{item.improved_answer}</pre>

          <h3
            style={{
              fontSize: 15,
              color: theme.muted,
              marginBottom: 8,
              marginTop: theme.spacing.sm,
            }}
          >
            Correct Answer
          </h3>
          <pre
            style={{
              ...preStyle,
              background: theme.primaryLight,
              border: `1px solid #bfdbfe`,
            }}
          >
            {item.correct_answer}
          </pre>
        </Card>
      ))}
    </PageShell>
  );
}

export default Results;
