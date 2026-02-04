// components/mitigation-wizard.tsx
export function MitigationWizard({ steps }: { steps: any[] }) {
  if (!steps || steps.length === 0) {
    return <p className="text-sm text-gray-400 italic">No hay acciones de mitigación registradas.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {steps.map((step, index) => (
        <div key={index} className="p-5 bg-white border rounded-2xl shadow-sm hover:border-orange-200 transition-colors">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold shrink-0">
              {step.step_number} {/* BIEN: Acceso a propiedad primitiva */}
            </div>
            <div>
              <h4 className="font-bold text-gray-900">{step.title}</h4> {/* BIEN */}
              <p className="text-sm text-gray-500 mt-1 leading-relaxed">{step.description}</p> {/* BIEN */}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}