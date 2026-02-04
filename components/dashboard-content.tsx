"use client";

import React from "react";
import { DashboardSidebar } from "@/components/sidebar";
import { WhatsAppChat } from "@/components/whatsapp-chat";
import { RiskScoreCard } from "@/components/risk-score-card";
import { MitigationWizard } from "@/components/mitigation-wizard";
import { RiskDashboardData } from "@/lib/services/risk.service";

interface DashboardContentProps {
  initialData: RiskDashboardData;
  currentRubro: string;
}

export function DashboardContent({
  initialData,
  currentRubro,
}: DashboardContentProps) {
  /**
   * Normalización defensiva
   * Evita crashes SSR / hydration
   */
  const score: number | null =
    typeof initialData?.score === "number"
      ? initialData.score
      : null;

  return (
    <div className="h-screen w-screen overflow-hidden flex bg-background text-foreground">
      {/* Sidebar */}
      <DashboardSidebar />

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="shrink-0 border-b border-border bg-card/80 backdrop-blur px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-sm uppercase tracking-widest text-muted-foreground">
                Cliente Maestro
              </h1>
              <p className="text-xs text-muted-foreground">
                Rubro activo: {currentRubro}
              </p>
            </div>

            <div className="text-center">
              <span className="block text-[4rem] font-mono font-bold text-red-600 leading-none">
                {score !== null ? score.toFixed(1) : "—"}
              </span>
              <span className="text-sm text-muted-foreground">
                Score Crítico del Cliente
              </span>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-hidden flex">
          {/* Left panel */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-background">
            <RiskScoreCard
              score={initialData.score}
              impact={initialData.impact}
              evaluation={initialData.evaluation}
            />

            {initialData.mitigationPlan && (
              <MitigationWizard
                steps={initialData.mitigationPlan}
              />
            )}
          </div>

          {/* Right panel: Chat */}
          <aside className="w-[420px] border-l border-border bg-card/50 overflow-hidden">
            <WhatsAppChat
              initialMessages={initialData.notifications}
              mitigationSteps={initialData.mitigationPlan}
            />
          </aside>
        </div>
      </div>
    </div>
  );
}

