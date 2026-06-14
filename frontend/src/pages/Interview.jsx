import { useContext, useState } from "react";
import { InterviewContext } from "../context/InterviewContext";
import { useNavigate } from "react-router-dom";
import PageShell from "../components/PageShell";
import Card from "../components/Card";
import Button from "../components/Button";
import PageActions from "../components/PageActions";
import theme from "../styles/theme";
import { textareaStyle } from "../styles/shared";

function Interview() {
  const navigate = useNavigate();
  const { role, questions, setResults } = useContext(InterviewContext);
  const [loading, setLoading] = useState(false);

  const questionList = questions
    .split("\n")
    .filter((q) => q.trim() !== "");

  const [answers, setAnswers] = useState(
    Array(questionList.length).fill("")
  );

  const answeredCount = answers.filter((a) => a.trim() !== "").length;
  const progress =
    questionList.length > 0
      ? Math.round((answeredCount / questionList.length) * 100)
      : 0;

  const handleAnswerChange = (index, value) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = value;
    setAnswers(updatedAnswers);
  };

  const submitAnswers = async () => {
    for (let answer of answers) {
      if (answer.trim() === "") {
        alert("Please answer all questions before submitting.");
        return;
      }
    }

    try {
      setLoading(true);

      const token =
  localStorage.getItem("token");

const response = await fetch(
  "https://smart-interview-coach-ozbd.onrender.com/evaluate_answers",
  {
    method: "POST",

    headers: {
      "Content-Type":
        "application/json",

      Authorization:
        `Bearer ${token}`,
    },

    body: JSON.stringify({
      role,
      questions: questionList,
      answers: answers,
    }),
  }
);

      const data = await response.json();

      setResults(data.results);
      localStorage.setItem("summary", JSON.stringify(data.summary));

      navigate("/results");
    } catch (error) {
      console.error(error);
      alert("Failed to evaluate answers.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageShell
      step={3}
      title="Mock Interview"
      subtitle="Answer all questions before submitting"
      actions={
        <PageActions sticky>
          <Button variant="secondary" onClick={() => navigate("/role")}>
            ← Back to Role
          </Button>
          <Button onClick={submitAnswers} disabled={loading}>
            {loading ? "Evaluating..." : "Submit Answers"}
          </Button>
        </PageActions>
      }
    >
      <Card>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: theme.spacing.sm,
            marginBottom: theme.spacing.sm,
          }}
        >
          <span style={{ fontWeight: 600, color: theme.text }}>
            Question {answeredCount} of {questionList.length} answered
          </span>
          {role && (
            <span style={{ color: theme.muted, fontSize: 14 }}>
              Role: {role}
            </span>
          )}
        </div>
        <div
          style={{
            height: 8,
            background: theme.border,
            borderRadius: 999,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${progress}%`,
              background: theme.primary,
              borderRadius: 999,
              transition: "width 0.2s ease",
            }}
          />
        </div>
      </Card>

      {questionList.map((question, index) => (
        <Card key={index} title={`Question ${index + 1}`}>
          <p
            style={{
              marginBottom: theme.spacing.sm,
              color: theme.text,
              lineHeight: 1.6,
            }}
          >
            {question}
          </p>
          <textarea
            rows={5}
            placeholder="Type your answer here..."
            value={answers[index]}
            onChange={(e) => handleAnswerChange(index, e.target.value)}
            style={textareaStyle}
          />
        </Card>
      ))}
    </PageShell>
  );
}

export default Interview;
