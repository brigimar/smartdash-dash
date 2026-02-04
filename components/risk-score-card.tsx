"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface RiskScoreCardProps {
  score: number;
  impact: string;
  evaluation: string;
}

export function RiskScoreCard({ score, impact, evaluation }: RiskScoreCardProps) {
  // 1. Configuración de Colores
  const getGradientColors = (s: number) => {
    if (s >= 80) return { start: "#FCA5A5", end: "#DC2626", badgeBg: "bg-red-50", badgeText: "text-red-600", label: "Crítico" }; 
    if (s >= 60) return { start: "#FDBA74", end: "#EA580C", badgeBg: "bg-orange-50", badgeText: "text-orange-600", label: "Alto" }; 
    if (s >= 40) return { start: "#FDE047", end: "#CA8A04", badgeBg: "bg-yellow-50", badgeText: "text-yellow-700", label: "Medio" }; 
    return { start: "#86EFAC", end: "#16A34A", badgeBg: "bg-green-50", badgeText: "text-green-700", label: "Bajo" }; 
  };

  const config = getGradientColors(score);

  // 2. Cálculos Geométricos para el SVG (Gauge)
  const radius = 85;
  const strokeWidth = 12;
  const center = 100; // SVG Viewbox 200x110
  const circumference = Math.PI * radius; 
  const progressOffset = circumference - (score / 100) * circumference;

  const angle = 180 - (score / 100) * 180;
  const angleRad = (angle * Math.PI) / 180;
  const needleX = center + radius * Math.cos(angleRad);
  const needleY = center - radius * Math.sin(angleRad);

  return (
    <Card className="relative overflow-hidden border-none shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] bg-white rounded-[32px] p-8 transition-all hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)]">
      <div className="flex flex-col md:flex-row items-center gap-10">
        
        {/* --- GAUGE VISUAL --- */}
        <div className="relative w-64 h-32 flex-shrink-0">
          <svg viewBox="0 0 200 110" className="w-full h-full overflow-visible">
            <defs>
              <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={config.start} />
                <stop offset="100%" stopColor={config.end} />
              </linearGradient>
              <filter id="needleShadow" x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="rgba(0,0,0,0.15)" />
              </filter>
            </defs>

            {/* Carril de Fondo */}
            <path
              d={`M ${center - radius} ${center} A ${radius} ${radius} 0 0 1 ${center + radius} ${center}`}
              fill="none"
              stroke="#F3F4F6"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
            />

            {/* Arco de Progreso */}
            <path
              d={`M ${center - radius} ${center} A ${radius} ${radius} 0 0 1 ${center + radius} ${center}`}
              fill="none"
              stroke="url(#gaugeGradient)"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={progressOffset}
              className="transition-all duration-1000 ease-out"
            />

            {/* Aguja (Círculo) */}
            <circle
              cx={needleX}
              cy={needleY}
              r="8"
              fill="white"
              stroke={config.end}
              strokeWidth="3"
              filter="url(#needleShadow)"
              className="transition-all duration-1000 ease-out"
            />
          </svg>

          {/* Texto Central */}
          <div className="absolute inset-0 top-6 flex flex-col items-center justify-end text-center">
            <span className="text-5xl font-bold tracking-tighter text-gray-900 font-sans">
              {score.toFixed(1)}
            </span>
            <span className="text-sm font-medium text-gray-400 mt-1 uppercase tracking-widest text-[10px]">
              Índice Riesgo
            </span>
          </div>
        </div>

        {/* --- DATOS Y TEXTO --- */}
        <div className="flex-1 space-y-5 text-center md:text-left w-full">
          <div className="flex items-center justify-center md:justify-start gap-3">
             <Badge className={cn("px-4 py-1.5 rounded-full font-semibold border-0 text-sm", config.badgeBg, config.badgeText)}>
               ● {config.label}
             </Badge>
             <span className="text-xs font-medium text-gray-400">Actualizado ahora</span>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Impacto Financiero Proyectado</h3>
            <div className="text-3xl font-bold text-gray-900 tracking-tight">
              {impact}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100/50 text-gray-600 text-sm leading-relaxed">
            {/* ETIQUETA ACTUALIZADA */}
            <span className="font-semibold text-gray-900">Detección de Desvío: </span> 
            {evaluation}
          </div>
        </div>
      </div>
    </Card>
  );
}