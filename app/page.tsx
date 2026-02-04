import { DashboardHeader } from "@/components/dashboard-header";
import { RiskScoreCard } from "@/components/risk-score-card";
import { RiskSignals } from "@/components/risk-signals";
import { MitigationWizard } from "@/components/mitigation-wizard";
import { WhatsAppChat } from "@/components/whatsapp-chat";
import { AiReportCard } from "@/components/ai-report-card";
import { WelcomeScreen } from "@/components/welcome-screen";
import { HistoryTable } from "@/components/history-table";
import { RubroSelector } from "@/components/rubro-selector";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, History } from "lucide-react";

import { getScenariosFromDB, getDashboardData, getHistoryFromDB } from "@/lib/actions";

export const dynamic = 'force-dynamic';

export default async function Page(props: { searchParams: Promise<{ [key: string]: string | undefined }> }) {
  const searchParams = await props.searchParams;
  const rubro = searchParams.rubro;
  const scenarioId = searchParams.scenario;

  // ESTADO 1: No hay rubro seleccionado -> Mostrar presentación
  if (!rubro) {
    return (
      <div className="min-h-screen bg-[#F9FAFB]">
        <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
          <DashboardHeader />
        </header>
        <RubroSelector />
      </div>
    );
  }

  // ESTADO 2: Rubro seleccionado pero no el caso -> Mostrar 3 Cards
  if (rubro && !scenarioId) {
    const scenarios = await getScenariosFromDB(rubro);
    return (
      <div className="min-h-screen bg-[#F9FAFB]">
        <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
          <DashboardHeader />
        </header>
        <div className="max-w-6xl mx-auto px-6 pt-8">
          <Link href="/" className="inline-flex items-center text-sm font-bold text-slate-400 hover:text-orange-600 transition-colors">
            <ArrowLeft size={16} className="mr-2" /> Volver a Segmentos
          </Link>
        </div>
        <WelcomeScreen currentRubro={rubro} scenarios={scenarios} />
      </div>
    );
  }

  // ESTADO 3: Caso seleccionado -> Dashboard Detallado
  const [data, history] = await Promise.all([
    getDashboardData(scenarioId!),
    getHistoryFromDB(rubro)
  ]);

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col font-sans">
      <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <DashboardHeader />
      </header>

      <div className="max-w-[1600px] mx-auto w-full flex flex-col xl:flex-row flex-1 relative">
        <main className="flex-1 p-6 lg:p-10 space-y-12 order-1 overflow-y-auto">
          {data ? (
            <div className="max-w-5xl mx-auto space-y-12 pb-24 animate-in fade-in duration-500">
              <Link href={`/?rubro=${rubro}`} className="inline-flex items-center text-sm font-bold text-slate-400 hover:text-orange-600">
                <ArrowLeft size={16} className="mr-2" /> Volver a Escenarios
              </Link>
              
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                Análisis: <span className="text-orange-600">{data.evaluation}</span>
              </h2>

              <RiskScoreCard score={data.score} impact={data.impact} evaluation={data.evaluation} />

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2"><RiskSignals signals={data.signals} /></div>
                <div className="lg:col-span-1"><AiReportCard /></div>
              </div>

              <div className="pt-10 border-t border-slate-100">
                <h3 className="text-xl font-bold text-slate-900 mb-8 flex items-center gap-2">
                  <CheckCircle2 size={22} className="text-emerald-500" /> Plan de Mitigación
                </h3>
                <MitigationWizard steps={data.mitigationSteps} />
              </div>

              <div className="pt-10 border-t border-slate-100">
                <h3 className="text-xl font-bold text-slate-900 mb-8 flex items-center gap-2">
                  <History size={22} className="text-blue-500" /> Historial Reciente de {rubro}
                </h3>
                <HistoryTable historyData={history} />
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center">
              <div className="bg-orange-50 p-6 rounded-full mb-4 animate-pulse">⚠️</div>
              <h3 className="text-xl font-bold">Escenario no encontrado</h3>
              <p className="text-slate-500 mt-2 font-medium">Los datos no existen en la Fuente de la Verdad.</p>
            </div>
          )}
        </main>

        <aside className="w-full xl:w-[420px] order-2 xl:order-none shrink-0 border-l bg-gray-50/20">
          <div className="xl:sticky xl:top-24 p-6 flex justify-center">
            {data && <WhatsAppChat initialMessages={data.notifications} mitigationSteps={data.mitigationSteps} />}
          </div>
        </aside>
      </div>
    </div>
  );
}