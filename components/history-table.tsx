"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";

interface HistoryItem {
  id: string;
  global_score: number;
  risk_level: string;
  scenario_description: string;
  created_at: string;
}

interface HistoryTableProps {
  historyData: HistoryItem[];
}

const RISK_BADGE: Record<string, string> = {
  critical: "bg-red-50 text-red-600",
  high: "bg-orange-50 text-orange-600",
  medium: "bg-yellow-50 text-yellow-700",
  low: "bg-emerald-50 text-emerald-700",
};

export function HistoryTable({ historyData }: HistoryTableProps) {
  if (!historyData || historyData.length === 0) {
    return (
      <Card className="p-8 text-center bg-card">
        <p className="text-muted-foreground text-sm">
          No hay historial disponible para este rubro.
        </p>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden bg-card border border-border">
      <div className="divide-y divide-border">
        {historyData.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between px-6 py-4 hover:bg-muted/40 transition-colors"
          >
            {/* Descripción */}
            <div className="space-y-1">
              <p className="font-medium text-foreground">
                {item.scenario_description}
              </p>
              <p className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(item.created_at), {
                  addSuffix: true,
                })}
              </p>
            </div>

            {/* Métricas */}
            <div className="flex items-center gap-4">
              <span className="font-mono font-semibold text-foreground">
                {item.global_score.toFixed(1)}
              </span>

              <Badge
                className={cn(
                  "capitalize",
                  RISK_BADGE[item.risk_level] ?? "bg-muted text-muted-foreground"
                )}
              >
                {item.risk_level}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
