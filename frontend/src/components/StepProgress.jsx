import theme from "../styles/theme";

const STEPS = [
  { number: 1, label: "Upload" },
  { number: 2, label: "Role" },
  { number: 3, label: "Interview" },
  { number: 4, label: "Results" },
];

function StepProgress({ currentStep }) {
  return (
    <div
      style={{
        background: theme.card,
        borderBottom: `1px solid ${theme.border}`,
        padding: `${theme.spacing.sm}px ${theme.spacing.md}px`,
      }}
    >
      <div
        style={{
          maxWidth: theme.maxWidth,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: theme.spacing.xs,
          flexWrap: "wrap",
        }}
      >
        {STEPS.map((step, index) => {
          const isComplete = currentStep > step.number;
          const isActive = currentStep === step.number;

          return (
            <div
              key={step.number}
              style={{
                display: "flex",
                alignItems: "center",
                gap: theme.spacing.xs,
                flex: index < STEPS.length - 1 ? 1 : "none",
                minWidth: 0,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 13,
                    fontWeight: 700,
                    background: isComplete || isActive ? theme.primary : theme.background,
                    color: isComplete || isActive ? "#fff" : theme.muted,
                    border: isActive ? `2px solid ${theme.primary}` : `1px solid ${theme.border}`,
                  }}
                >
                  {isComplete ? "✓" : step.number}
                </span>
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: isActive ? 600 : 500,
                    color: isActive ? theme.primary : isComplete ? theme.text : theme.muted,
                  }}
                >
                  {step.label}
                </span>
              </div>
              {index < STEPS.length - 1 && (
                <div
                  style={{
                    flex: 1,
                    height: 2,
                    background: isComplete ? theme.primary : theme.border,
                    marginLeft: theme.spacing.xs,
                    marginRight: theme.spacing.xs,
                    minWidth: 16,
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default StepProgress;
