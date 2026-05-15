import "../css/breadcrumb.css";

function StepBreadcrumb({ categories, activeStep, selectedResources, onStepClick }) {
  return (
    <div className="step-breadcrumb">
      <div className="breadcrumb-inner">
        {categories.map((category, index) => {
          const isActive = index === activeStep;
          const isCompleted = selectedResources[category] != null && !isActive;
          const isUpcoming = index > activeStep;

          return (
            <div key={category} className="step-item">
              <button
                className={[
                  "step-chip",
                  isActive ? "step-chip--active" : "",
                  isCompleted ? "step-chip--completed" : "",
                  isUpcoming ? "step-chip--upcoming" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                onClick={() => {
                  if (!isUpcoming) onStepClick(index);
                }}
                disabled={isUpcoming}
              >
                {isCompleted && <span className="step-check">✓ </span>}
                <span className="step-label">{category}</span>
                {isCompleted && selectedResources[category] && (
                  <span className="step-sublabel">
                    {" "}· {selectedResources[category].title}
                  </span>
                )}
              </button>
              {index < categories.length - 1 && (
                <span className="step-arrow">›</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default StepBreadcrumb;
