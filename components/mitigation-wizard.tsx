// components/mitigation-wizard.tsx
"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface MitigationStep {
  step_number: number;
  title: string;
  description: string;
}

export function MitigationWizard({ steps }: { steps: MitigationStep[] }) {
  if (!steps || steps.length === 0) {
    return (
      <p className="text-sm text-muted-foreground italic">
        No hay acciones de mitigación registradas.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {steps.map((step) => (
        <div
          key={step.step_number}
          className={cn(
            "p-5 rounded-2xl border border-border bg-card shadow-sm",
            "transition-colors hover:bg-accent/30"
          )}
        >
          <div className="flex items-start gap-4">
            {/* Step number */}
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                "bg-primary/10 text-primary font-bold text-sm"
              )}
            >
              {step.step_number}
            </div>

            {/* Content */}
            <div>
              <h4 className="font-bold text-foreground">
                {step.title}
              </h4>
              <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                {step.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
