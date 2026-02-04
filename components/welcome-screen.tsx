"use client";

import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Activity, AlertTriangle } from "lucide-react";
import { ScenarioCard } from "@/lib/actions";
import { cn } from "@/lib/utils";

export function WelcomeScreen({
  currentRubro,
  scenarios,
}: {
  currentRubro: string;
  scenarios: ScenarioCard[];
}) {
  const severityStyles: Record<string, string> = {
    critical: "bg-destructive/10 text-destructive",
    high: "bg-accent text-accent-foreground",
    medium: "bg-muted text-muted-foreground",
    low: "bg-muted/50 text-muted-foreground",
  };

  const leftBorderStyles: Record<string, string> = {
    critical: "bg-destructive",
    high: "bg-primary",
    medium: "bg-muted-foreground",
    low: "bg-border",
  };

  return (
    <div className="p-6 lg:p-10 animate-in fade-in duration-500">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h2 className="text-3xl font-black tracking-tight text-foreground mb-2">
            Panel de Control:{" "}
            <span className="text-primary">{currentRubro}</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Selecciona un escenario para análisis detallado.
          </p>
        </div>

        {/* Grid */}
        {scenarios.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {scenarios.map((scenario) => (
              <Link
                key={scenario.id}
                href={`/?rubro=${currentRubro}&scenario=${scenario.id}`}
                className="group block h-full"
              >
                <Card className="relative h-full bg-card border border-border overflow-hidden transition-all duration-300 hover:shadow-lg hover:bg-accent/30">
                  {/* Left severity bar */}
                  <div
                    className={cn(
                      "absolute left-0 top-0 bottom-0 w-1.5",
                      leftBorderStyles[scenario.urgency] ??
                        leftBorderStyles.low
                    )}
                  />

                  <CardHeader className="pb-2 pl-6">
                    <div className="flex justify-between items-start mb-2">
                      <Badge
                        variant="outline"
                        className="text-[10px] uppercase tracking-wider font-bold"
                      >
                        {scenario.axis}
                      </Badge>

                      {scenario.urgency === "critical" && (
                        <AlertTriangle
                          size={18}
                          className="text-destructive animate-pulse"
                        />
                      )}
                    </div>

                    <CardTitle className="text-lg font-bold text-foreground group-hover:text-primary transition-colors leading-tight">
                      {scenario.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="pb-4 pl-6">
                    <CardDescription className="text-muted-foreground leading-relaxed line-clamp-2">
                      {scenario.description}
                    </CardDescription>
                  </CardContent>

                  <CardFooter className="pl-6 pt-0 mt-auto flex items-center justify-between">
                    <Badge
                      className={cn(
                        "text-xs font-bold border-0 capitalize",
                        severityStyles[scenario.urgency] ??
                          severityStyles.low
                      )}
                    >
                      {scenario.urgency}
                    </Badge>

                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center transition-colors group-hover:bg-primary/10">
                      <ArrowRight
                        size={16}
                        className="text-muted-foreground group-hover:text-primary transition-colors"
                      />
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="border-2 border-dashed border-border rounded-3xl p-12 text-center bg-muted/30">
            <Activity
              className="mx-auto mb-4 text-muted-foreground"
              size={32}
            />
            <h3 className="text-lg font-bold text-foreground">
              No hay alertas activas
            </h3>
            <p className="text-muted-foreground mt-1">
              La Fuente de la Verdad no reporta incidentes para {currentRubro}.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
