"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Brain, Lock, FileText, ArrowRight } from "lucide-react";

export function AiReportCard() {
  return (
    <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 text-white shadow-2xl p-6 h-full flex flex-col justify-between group">
      
      {/* Fondo Decorativo */}
      <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-purple-500 rounded-full blur-[80px] opacity-30 animate-pulse" />
      <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-indigo-500 rounded-full blur-[80px] opacity-20" />

      {/* Cabecera */}
      <div className="relative z-10 flex justify-between items-start">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Brain className="text-purple-300" size={24} />
            <h3 className="font-bold text-lg tracking-wide">SmartDash AI</h3>
          </div>
          <p className="text-purple-200/80 text-xs uppercase tracking-widest font-semibold">
            Reporte Premium
          </p>
        </div>
        <Badge className="bg-gradient-to-r from-amber-400 to-orange-500 text-black border-0 font-bold shadow-lg animate-shimmer bg-[length:200%_100%]">
          PRO
        </Badge>
      </div>

      {/* Contenido Simulado (Blurry text effect para dar intriga) */}
      <div className="relative z-10 mt-6 space-y-3">
        <div className="flex items-center gap-3 p-3 rounded-lg bg-white/10 backdrop-blur-md border border-white/10 hover:bg-white/15 transition-colors cursor-pointer">
           <FileText size={18} className="text-purple-300" />
           <div className="flex-1">
             <div className="h-2.5 w-24 bg-purple-300/50 rounded mb-1.5" />
             <div className="h-2 w-full bg-white/20 rounded" />
           </div>
           <Lock size={14} className="text-white/40" />
        </div>
        
        <div className="flex items-center gap-3 p-3 rounded-lg bg-white/10 backdrop-blur-md border border-white/10 hover:bg-white/15 transition-colors cursor-pointer">
           <Sparkles size={18} className="text-amber-300" />
           <div className="flex-1">
             <div className="h-2.5 w-32 bg-amber-300/50 rounded mb-1.5" />
             <div className="h-2 w-3/4 bg-white/20 rounded" />
           </div>
           <Lock size={14} className="text-white/40" />
        </div>
      </div>

      {/* CTA (Llamada a la acción) */}
      <div className="relative z-10 mt-6">
        <p className="text-xs text-center text-purple-200 mb-3 leading-relaxed">
          La IA ha detectado 3 patrones ocultos de fuga de capital. 
          <br/>Desbloquea el reporte completo.
        </p>
        <Button className="w-full bg-white text-purple-900 hover:bg-purple-50 font-bold shadow-xl transition-all hover:scale-[1.02]">
          Generar Reporte IA <ArrowRight size={16} className="ml-2" />
        </Button>
      </div>
    </Card>
  );
}