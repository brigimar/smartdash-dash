"use client";

import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Activity, AlertTriangle } from "lucide-react";
import { ScenarioCard } from "@/lib/actions"; // Importamos el tipo seguro

export function WelcomeScreen({ currentRubro, scenarios }: { currentRubro: string, scenarios: ScenarioCard[] }) {
  
  const severityColors: Record<string, string> = {
    critical: "bg-red-50 text-red-700 border-red-100",
    high: "bg-orange-50 text-orange-700 border-orange-100",
    medium: "bg-yellow-50 text-yellow-700 border-yellow-100",
    low: "bg-emerald-50 text-emerald-700 border-emerald-100",
  };

  return (
    <div className="p-6 lg:p-10 animate-in fade-in duration-500">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">
            Panel de Control: <span className="text-orange-600">{currentRubro}</span>
          </h2>
          <p className="text-slate-500 text-lg">Selecciona un escenario para análisis detallado.</p>
        </div>

        {scenarios.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {scenarios.map((scenario) => (
              <Link key={scenario.id} href={`/?rubro=${currentRubro}&scenario=${scenario.id}`} className="group block h-full">
                <Card className="h-full hover:shadow-lg hover:border-orange-300 transition-all duration-300 border-slate-200 cursor-pointer relative overflow-hidden">
                  <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${scenario.urgency === 'critical' ? 'bg-red-500' : scenario.urgency === 'high' ? 'bg-orange-500' : 'bg-slate-300'}`} />
                  <CardHeader className="pb-2 pl-6">
                    <div className="flex justify-between items-start w-full mb-2">
                      <Badge variant="outline" className="text-[10px] uppercase tracking-wider font-bold text-slate-500 bg-slate-50">{scenario.axis}</Badge>
                      {scenario.urgency === 'critical' && <AlertTriangle size={18} className="text-red-500 animate-pulse" />}
                    </div>
                    <CardTitle className="text-lg font-bold text-slate-900 group-hover:text-orange-600 transition-colors leading-tight">{scenario.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-4 pl-6">
                    <CardDescription className="text-slate-500 line-clamp-2 leading-relaxed">{scenario.description}</CardDescription>
                  </CardContent>
                  <CardFooter className="pt-0 pl-6 flex items-center justify-between mt-auto">
                    <Badge className={`text-xs font-bold px-2.5 py-0.5 border-0 ${severityColors[scenario.urgency] || severityColors.low}`}>{scenario.urgency}</Badge>
                    <div className="w-8 h-8 rounded-full bg-slate-50 group-hover:bg-orange-100 flex items-center justify-center transition-colors">
                      <ArrowRight size={16} className="text-slate-400 group-hover:text-orange-600" />
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="border-2 border-dashed border-slate-200 rounded-3xl p-12 text-center bg-slate-50/50">
            <Activity className="text-slate-300 mx-auto mb-4" size={32} />
            <h3 className="text-lg font-bold text-slate-700">No hay alertas activas</h3>
            <p className="text-slate-500 mt-1">La Fuente de la Verdad no reporta incidentes para {currentRubro}.</p>
          </div>
        )}
      </div>
    </div>
  );
}