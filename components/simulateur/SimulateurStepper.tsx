interface StepperProps {
  currentStep: number;
  totalSteps: number;
}

const stepLabels = [
  "Coordonnées",
  "Secteur",
  "Bâtiment",
  "Équipements",
  "Résultats",
];

export default function SimulateurStepper({ currentStep, totalSteps }: StepperProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      {/* Barre de progression */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-[#2c2c2a]/50 mb-2">
          <span>Étape {currentStep} sur {totalSteps}</span>
          <span>{Math.round((currentStep / totalSteps) * 100)}%</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#1a9e75] rounded-full transition-all duration-500 ease-out"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            role="progressbar"
            aria-valuenow={currentStep}
            aria-valuemin={1}
            aria-valuemax={totalSteps}
          />
        </div>
      </div>

      {/* Étapes */}
      <div className="flex items-center justify-between">
        {stepLabels.map((label, idx) => {
          const stepNum = idx + 1;
          const isCompleted = stepNum < currentStep;
          const isCurrent = stepNum === currentStep;
          return (
            <div
              key={label}
              className="flex flex-col items-center gap-1"
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  isCompleted
                    ? "bg-[#1a9e75] text-white"
                    : isCurrent
                    ? "bg-[#0d1e3a] text-white ring-4 ring-[#0d1e3a]/20"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                {isCompleted ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  stepNum
                )}
              </div>
              <span
                className={`text-xs font-medium hidden sm:block ${
                  isCurrent ? "text-[#0d1e3a]" : isCompleted ? "text-[#1a9e75]" : "text-gray-400"
                }`}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
