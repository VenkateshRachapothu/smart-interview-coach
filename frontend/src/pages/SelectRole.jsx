import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { InterviewContext } from "../context/InterviewContext";
import PageShell from "../components/PageShell";
import Card from "../components/Card";
import Button from "../components/Button";
import SkillChip from "../components/SkillChip";
import PageActions from "../components/PageActions";
import theme from "../styles/theme";
import { gridTwoCol } from "../styles/shared";

const ROLES = [
  "AI/ML Engineer",
  "Python Developer",
  "Data Analyst",
  "Software Developer",
];

function SelectRole() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { role, setRole, setQuestions } = useContext(InterviewContext);

  const skills = JSON.parse(localStorage.getItem("skills")) || [];

  const startInterview = async () => {
    if (!role) {
      alert("Please select a role");
      return;
    }

    try {
      setLoading(true);

      const resumeText = localStorage.getItem("resumeText");

      const response = await fetch("https://smart-interview-coach-ozbd.onrender.com/generate_questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role,
          skills,
          resume_text: resumeText,
        }),
      });

      const data = await response.json();

      setQuestions(data.questions);
      navigate("/interview");
    } catch (error) {
      console.error(error);
      alert("Failed to generate questions");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageShell
      step={2}
      title="Select Role"
      subtitle="Choose the role you want to practice for"
      actions={
        <PageActions>
          <Button variant="secondary" onClick={() => navigate("/upload")}>
            ← Back to Upload
          </Button>
          <Button onClick={startInterview} disabled={!role || loading}>
            {loading ? "Generating questions..." : "Start Interview →"}
          </Button>
        </PageActions>
      }
    >
      <Card title="Target Role">
        <div style={gridTwoCol}>
          {ROLES.map((roleOption) => {
            const selected = role === roleOption;
            return (
              <label
                key={roleOption}
                style={{
                  display: "block",
                  padding: theme.spacing.md,
                  borderRadius: theme.radius.md,
                  border: `2px solid ${selected ? theme.primary : theme.border}`,
                  background: selected ? theme.primaryLight : theme.card,
                  cursor: "pointer",
                  transition: "border-color 0.15s ease",
                }}
              >
                <input
                  type="radio"
                  value={roleOption}
                  checked={selected}
                  onChange={(e) => setRole(e.target.value)}
                  style={{ marginRight: 10 }}
                />
                <span style={{ fontWeight: 600, color: theme.text }}>
                  {roleOption}
                </span>
              </label>
            );
          })}
        </div>
      </Card>

      {skills.length > 0 && (
        <Card title="Skills from Resume">
          <div>
            {skills.map((skill, index) => (
              <SkillChip key={index} label={skill} />
            ))}
          </div>
        </Card>
      )}
    </PageShell>
  );
}

export default SelectRole;
