"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";

// ESTAS ID DEBEN COINCIDIR CON LAS KEYS DE WIZARD_SCENARIOS
const SEGMENTS = [
  { id: "Pyme", label: "🏭 Pyme" },
  { id: "E-commerce", label: "🛒 E-commerce" },
  { id: "Creadores", label: "🎨 Creadores" },
  { id: "Startups", label: "🚀 Startups" },
];

export function DashboardHeader() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Leemos la URL. Si no hay nada, Pyme es el default.
  const currentRubro = searchParams.get("rubro") || "Pyme";

  const handleRubroChange = (rubroId: string) => {
    // Al cambiar de rubro, borramos el "scenario" para volver a la pantalla de selección
    router.push(`/?rubro=${rubroId}`, { scroll: false });
  };

  return (
    <div className="flex items-center justify-between py-4 px-6 h-20 transition-all">
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push('/')}>
        <div className="w-8 h-8 bg-slate-900 text-white rounded-lg flex items-center justify-center font-bold text-xs shadow-sm">
          SD
        </div>
        <span className="font-bold text-gray-900 text-lg hidden sm:block tracking-tight">SmartDash</span>
      </div>

      <div className="flex gap-1 bg-gray-100/80 p-1.5 rounded-xl border border-gray-200/50 backdrop-blur-sm overflow-x-auto">
        {SEGMENTS.map((seg) => {
          const isActive = seg.id === currentRubro;
          return (
            <Button
              key={seg.id}
              variant="ghost"
              onClick={() => handleRubroChange(seg.id)}
              className={cn(
                "rounded-lg text-sm font-medium transition-all duration-200 h-9 px-4 relative whitespace-nowrap",
                isActive
                  ? "bg-white text-orange-600 shadow-sm ring-1 ring-black/5 font-bold"
                  : "text-gray-500 hover:bg-gray-200/50 hover:text-gray-900"
              )}
            >
              {seg.label}
            </Button>
          );
        })}
      </div>

      <div className="w-8 hidden sm:block"></div>
    </div>
  );
}