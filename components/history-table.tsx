"use client";

import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronUp, AlertCircle, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";
import { HistoryItem } from "@/lib/actions"; // Importamos tipo seguro

export function HistoryTable({ historyData }: { historyData: HistoryItem[] }) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (!historyData || historyData.length === 0) {
    return (
      <div className="p-12 text-center border border-dashed rounded-xl bg-slate-50/50">
        <p className="text-slate-400 text-sm">Sin historial disponible.</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border bg-white shadow-sm overflow-hidden border-slate-200">
      <Table>
        <TableHeader className="bg-slate-50/50">
          <TableRow>
            <TableHead className="w-10"></TableHead>
            <TableHead className="text-xs font-bold uppercase tracking-wider text-slate-500">Escenario</TableHead>
            <TableHead className="text-xs font-bold uppercase tracking-wider text-slate-500">Impacto</TableHead>
            <TableHead className="text-xs font-bold uppercase tracking-wider text-slate-500 text-center">Nivel</TableHead>
            <TableHead className="text-xs font-bold uppercase tracking-wider text-slate-500">Estado</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {historyData.map((item) => (
            <React.Fragment key={item.id}>
              <TableRow 
                className={cn("cursor-pointer transition-colors", expandedId === item.id ? "bg-orange-50/30" : "hover:bg-slate-50")}
                onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
              >
                <TableCell className="text-center">
                  {expandedId === item.id ? <ChevronUp size={14} className="text-orange-500"/> : <ChevronDown size={14} className="text-slate-400"/>}
                </TableCell>
                <TableCell>
                  <div className="font-bold text-slate-900 text-sm">{item.scenario}</div>
                  <div className="text-[10px] text-slate-400 font-mono uppercase">{item.id}</div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-sm font-semibold text-slate-700">
                    <DollarSign size={12} className="text-emerald-500" />{item.impact.toLocaleString()}
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <Badge className={cn("text-[9px] uppercase px-2", item.risk_level === 'critical' ? 'bg-red-500' : 'bg-orange-500')}>{item.risk_level}</Badge>
                </TableCell>
                <TableCell>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">{item.status === 'completed' ? 'Resuelto' : 'Pendiente'}</span>
                </TableCell>
              </TableRow>
              
              {expandedId === item.id && (
                <TableRow className="bg-slate-50/30 hover:bg-slate-50/30">
                  <TableCell colSpan={5} className="p-0">
                    <div className="p-6 border-l-4 border-orange-500">
                      <div className="flex items-center gap-2 mb-4">
                        <AlertCircle size={14} className="text-orange-600" />
                        <h4 className="text-xs font-black uppercase text-slate-700">Plan de Mitigación</h4>
                      </div>
                      <div className="grid grid-cols-1 gap-3">
                        {item.mitigation_plan.map((step, idx) => (
                          <div key={idx} className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm flex gap-3">
                            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-slate-900 text-white text-[10px] flex items-center justify-center font-bold">{step.step}</span>
                            <div>
                              <p className="text-xs font-bold text-slate-900">{step.title}</p>
                              <p className="text-[10px] text-slate-500">{step.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}