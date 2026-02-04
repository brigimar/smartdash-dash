"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Activity, AlertCircle, DollarSign, Users, Zap } from "lucide-react";

// 1. DICCIONARIO DE TRADUCCIÓN
const SIGNAL_LABELS: Record<string, string> = {
  CASH_FLOW: "Flujo de Caja",
  TAX_LIMIT: "Límite Fiscal",
  REVENUE_RISK: "Riesgo de Ingresos",
  RUNWAY: "Runway Financiero",
  BURNOUT: "Agotamiento Laboral",
  WORKLOAD: "Carga de Trabajo",
  STOCK_LEVEL: "Nivel de Stock",
  DELAY: "Retraso en Proyecto",
  CHURN: "Tasa de Cancelación",
  NPS_DROP: "Caída de NPS",
  REACH: "Alcance Orgánico",
  UX_FAIL: "Falla de UX"
};

const SIGNAL_ICONS: Record<string, any> = {
  financial: DollarSign,
  human: Users,
  operational: Zap,
  reputation: Activity
};

// 2. COLORES OPTIMIZADOS PARA FONDO OSCURO (Alta Luminosidad)
// Usamos fondos translúcidos y colores de texto vibrantes para que resalten
const SIGNAL_DARK_COLORS: Record<string, string> = {
  financial: "bg-emerald-400/10 text-emerald-300 border-emerald-400/20", 
  human: "bg-blue-400/10 text-blue-300 border-blue-400/20",
  operational: "bg-purple-400/10 text-purple-300 border-purple-400/20",
  reputation: "bg-orange-400/10 text-orange-300 border-orange-400/20"
};

interface RiskSignal {
  type: string;
  code: string;
  value: string | number;
  description: string;
}

interface RiskSignalsProps {
  signals: RiskSignal[];
}

export function RiskSignals({ signals }: RiskSignalsProps) {
  if (!signals || signals.length === 0) return null;

  return (
    <div className="space-y-4 animate-in slide-in-from-bottom-5 duration-700 delay-200">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <Activity size={18} className="text-orange-600" />
          Señales Detectadas
        </h3>
        <Badge variant="outline" className="text-xs font-normal text-gray-500 border-gray-200">
          Fuente: SmartDash Engine
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {signals.map((signal, idx) => {
          const Icon = SIGNAL_ICONS[signal.type] || AlertCircle;
          // Usamos la nueva paleta oscura
          const colorClass = SIGNAL_DARK_COLORS[signal.type] || "bg-gray-400/10 text-gray-300 border-gray-400/20";
          const translatedLabel = SIGNAL_LABELS[signal.code] || signal.code;

          return (
            // --- CAMBIOS CLAVE DE DISEÑO ---
            <Card 
              key={idx} 
              // 1. Gradiente Corporativo Oscuro (Slate Blue)
              // 2. Quitamos bordes grises default, dejamos solo el naranja a la izquierda
              className="p-6 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 border-0 border-l-[6px] border-l-orange-500 shadow-xl shadow-slate-900/20 group relative overflow-hidden"
            >
              {/* Efecto de brillo sutil en hover */}
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/[0.02] transition-colors pointer-events-none" />

              <div className="flex items-center justify-between mb-4 relative z-10">
                {/* Icono con fondo translúcido brillante */}
                <div className={`p-2.5 rounded-xl border backdrop-blur-sm ${colorClass} shadow-sm`}>
                  <Icon size={22} />
                </div>
                {/* Etiqueta técnica en gris claro */}
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest bg-slate-800/50 px-3 py-1 rounded-full border border-slate-700/50">
                  {translatedLabel}
                </span>
              </div>
              
              <div className="mt-3 relative z-10">
                {/* Título en BLANCO puro para máximo contraste */}
                <h4 className="font-bold text-white text-xl leading-snug tracking-tight">
                  {signal.description}
                </h4>
                
                <div className="mt-5 flex items-center gap-3 text-sm relative z-10">
                  {typeof signal.value === 'number' && (
                    // Métricas con fondo oscuro translúcido y texto claro
                    <Badge className="flex items-center gap-2 bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-200 font-mono px-3 py-1.5 text-sm">
                      {signal.value > 0 ? <TrendingDown size={16} className="text-red-400" /> : <TrendingUp size={16} className="text-emerald-400" />}
                      <span className="text-slate-400">Impacto:</span> {Math.abs(signal.value)}%
                    </Badge>
                  )}
                  {typeof signal.value === 'string' && (
                    <span className="text-xs font-semibold px-3 py-1.5 bg-slate-800/80 text-slate-300 rounded-full border border-slate-700/50">
                       Estado: <span className="text-white">{signal.value}</span>
                    </span>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}