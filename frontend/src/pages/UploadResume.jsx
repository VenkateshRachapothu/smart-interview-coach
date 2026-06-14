import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { InterviewContext } from "../context/InterviewContext";
import PageShell from "../components/PageShell";
import Card from "../components/Card";
import Button from "../components/Button";
import StatCard from "../components/StatCard";
import SkillChip from "../components/SkillChip";
import PageActions from "../components/PageActions";
import theme from "../styles/theme";
import { preStyle } from "../styles/shared";

function UploadResume() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [resumeText, setResumeText] = useState("");
  const [uploading, setUploading] = useState(false);
  const [showText, setShowText] = useState(false);

  const { skills, setSkills, resumeAnalysis, setResumeAnalysis } =
    useContext(InterviewContext);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a PDF resume.");
      return;
    }

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("resume", file);

      const response = await fetch("https://smart-interview-coach-ozbd.onrender.com/upload_resume", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Upload failed");
        return;
      }

      setResumeText(data.text || "");
      setSkills(data.skills || []);
      setResumeAnalysis(data.analysis || null);

      localStorage.setItem("skills", JSON.stringify(data.skills || []));
      localStorage.setItem("resumeAnalysis", JSON.stringify(data.analysis || {}));
      localStorage.setItem("resumeText", data.text);

      alert("Resume uploaded successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to upload resume.");
    } finally {
      setUploading(false);
    }
  };

  const atsScore = resumeAnalysis?.ats_score;
  const scoreColor =
    atsScore >= 75
      ? theme.success
      : atsScore >= 50
        ? theme.warning
        : theme.danger;

  return (
    <PageShell
      step={1}
      title="Upload Resume"
      subtitle="Upload your PDF to extract skills and run ATS analysis"
      actions={
        resumeAnalysis ? (
          <PageActions>
            <Button onClick={() => navigate("/role")}>
              Continue to Select Role →
            </Button>
          </PageActions>
        ) : null
      }
    >
      <Card title="Upload your resume">
        <div
          style={{
            border: `2px dashed ${theme.border}`,
            borderRadius: theme.radius.md,
            padding: theme.spacing.lg,
            textAlign: "center",
            background: theme.background,
            marginBottom: theme.spacing.sm,
          }}
        >
          <p style={{ color: theme.muted, marginBottom: theme.spacing.sm }}>
            Select a PDF resume to upload
          </p>
          <input
            type="file"
            accept=".pdf"
            aria-label="Upload PDF resume"
            onChange={(e) => setFile(e.target.files[0])}
            style={{ marginBottom: theme.spacing.sm }}
          />
          {file && (
            <p style={{ fontSize: 14, color: theme.text, marginBottom: theme.spacing.sm }}>
              Selected: <strong>{file.name}</strong>
            </p>
          )}
          <Button onClick={handleUpload} disabled={uploading}>
            {uploading ? "Uploading..." : "Upload Resume"}
          </Button>
        </div>
      </Card>

      {resumeAnalysis && (
        <Card title="ATS Resume Analysis">
          <div style={{ marginBottom: theme.spacing.md }}>
            <StatCard
              label="ATS Score"
              value={`${resumeAnalysis.ats_score}/100`}
              accent={scoreColor}
            />
          </div>
          <div style={{ display: "grid", gap: theme.spacing.sm }}>
            <p>
              <strong>Strengths:</strong> {resumeAnalysis.strengths}
            </p>
            <p>
              <strong>Weaknesses:</strong> {resumeAnalysis.weaknesses}
            </p>
            <p>
              <strong>Missing Skills:</strong> {resumeAnalysis.missing_skills}
            </p>
            <p>
              <strong>Suggestions:</strong> {resumeAnalysis.suggestions}
            </p>
          </div>
        </Card>
      )}

      {skills.length > 0 && (
        <Card title="Detected Skills">
          <div>
            {skills.map((skill, index) => (
              <SkillChip key={index} label={skill} />
            ))}
          </div>
        </Card>
      )}

      {resumeText && (
        <Card>
          <button
            type="button"
            onClick={() => setShowText(!showText)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: 16,
              fontWeight: 600,
              color: theme.text,
              padding: 0,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            {showText ? "▼" : "▶"} View extracted text
          </button>
          {showText && (
            <pre style={{ ...preStyle, marginTop: theme.spacing.sm }}>
              {resumeText}
            </pre>
          )}
        </Card>
      )}
    </PageShell>
  );
}

export default UploadResume;
