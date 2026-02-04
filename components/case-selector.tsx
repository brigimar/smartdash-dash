"use client";

import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Activity, AlertTriangle, Zap, Users, DollarSign } from "lucide-react";
import { ScenarioCard } from "@/lib/actions";

// Diccionario de Iconos por Vertical
const AXIS_ICONS: Record<string, any> = {
  "Financiero": DollarSign,
  "Humano": Users,
  "Operativo": Zap,
  "Reputación": Activity,
  "Legal": AlertTriangle,
  "Fiscal": DollarSign
};

const URGENCY_STYLES: Record<string, string> = {
  critical: "border-l-red-500 bg-red-50/10 hover:border-red-300",
  high: "border-l-orange-500 bg-orange-50/10 hover:border-orange-300",
  medium: "border-l-yellow-500 bg-yellow-50/10 hover:border-yellow-300",
  low: "border-l-emerald-500 bg-emerald-50/10 hover:border-emerald-300"
};

export function CaseSelector({ currentRubro, scenarios }: { currentRubro: string, scenarios: ScenarioCard[] }) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* HEADER DEL WIZARD STEP 2 */}
      <div className="mb-8 text-center lg:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wider mb-4">
          <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"/>
          Simulación en curso
        </div>
        <h2 className="text-3xl lg:text-4xl font-black text-slate-900 tracking-tight mb-3">
          Selecciona un problema en <span className="text-orange-600 underline decoration-orange-200 decoration-4 underline-offset-4">{currentRubro}</span>
        </h2>
        <p className="text-slate-500 text-lg max-w-2xl">
          Elige una de las situaciones detectadas por SmartDash para ver cómo el sistema analiza, cuantifica y mitiga el riesgo en tiempo real.
        </p>
      </div>

      {/* GRILLA DE SELECCIÓN */}
      {scenarios.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scenarios.map((scenario) => {
            const Icon = AXIS_ICONS[scenario.axis] || Activity;
            const borderStyle = URGENCY_STYLES[scenario.urgency] || URGENCY_STYLES.low;

            return (
              <Link key={scenario.id} href={`/?rubro=${currentRubro}&scenario=${scenario.id}`} className="group block h-full">
                <Card className={`h-full border-0 border-l-[6px] shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer bg-white relative overflow-hidden ${borderStyle}`}>
                  
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Icon size={80} className="text-slate-900" />
                  </div>

                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start mb-3">
                      <Badge variant="outline" className="bg-white/80 backdrop-blur text-[10px] font-bold uppercase tracking-wider text-slate-500 border-slate-200">
                        {scenario.axis}
                      </Badge>
                      {scenario.urgency === 'critical' && (
                        <span className="flex h-3 w-3 relative">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                        </span>
                      )}
                    </div>
                    <CardTitle className="text-xl font-bold text-slate-900 group-hover:text-orange-600 transition-colors leading-tight">
                      {scenario.title}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent>
                    <CardDescription className="text-slate-500 font-medium leading-relaxed">
                      {scenario.description}
                    </CardDescription>
                  </CardContent>

                  <CardFooter className="mt-auto pt-4 flex items-center text-sm font-bold text-slate-400 group-hover:text-orange-600 transition-colors">
                    Simular este caso <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </CardFooter>
                </Card>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="p-12 border-2 border-dashed border-slate-200 rounded-3xl text-center">
          <Activity className="mx-auto h-10 w-10 text-slate-300 mb-3" />
          <h3 className="text-lg font-medium text-slate-900">No hay casos disponibles</h3>
          <p className="text-slate-500">Verifica que los seeds se hayan ejecutado para el rubro {currentRubro}.</p>
        </div>
      )}
    </div>
  );
}