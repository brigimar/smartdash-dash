import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

// --- TIPOS DE LA UI (Lo que el Dashboard espera recibir) ---
interface DashboardResponse {
  score: number;
  impact: string;
  evaluation: string;
  mitigationSteps: string[];
  notifications: Array<{
    id: string;
    message: string;
    impact: string;
    action: string;
    timestamp: string;
  }>;
}

// --- DATOS DE RESPALDO (Demo Mode) ---
// Se usan si la DB no responde o está vacía, para no romper la UI
const DEMO_DATA: DashboardResponse = {
  score: 82.4,
  impact: "$18,500 USD PROJECTED RISK",
  evaluation: "Riesgo Crítico: Falta de liquidez inminente para nómina.",
  mitigationSteps: [
    "Cobrar facturas pendientes de Cliente X (Prioridad Alta)",
    "Revisar flujo de caja a 7 días"
  ],
  notifications: [
    {
      id: "demo-1",
      message: "⚠️ URGENTE: Riesgo de Nómina",
      impact: "$18,500",
      action: "Contactar clientes clave hoy",
      timestamp: new Date().toISOString()
    }
  ]
};

export async function GET() {
  try {
    // 1. Verificar conexión básica (evita crash si no hay .env)
    if (!sql) {
      console.warn("API: Sin conexión SQL configurada. Usando Demo Data.");
      return NextResponse.json(DEMO_DATA);
    }

    // 2. Consulta a Neon (FV: Schema smartdash_schema.sql)
    // Traemos el último snapshot disponible
    const snapshots = await sql`
      SELECT 
        global_score,
        risk_level,
        scenario_description,
        recommendation_text,
        financial_context,
        created_at
      FROM risk_snapshots
      ORDER BY created_at DESC
      LIMIT 1
    `;

    if (!snapshots || snapshots.length === 0) {
      console.warn("API: Tabla risk_snapshots vacía. Usando Demo Data.");
      return NextResponse.json(DEMO_DATA);
    }

    const snap = snapshots[0];

    // 3. MAPEO (Transformación de Datos Crudos -> UI Limpia)
    
    // a) Formateo del Score
    const score = Number(snap.global_score) || 0;
    
    // b) Extracción del contexto financiero (JSONB)
    const financial = snap.financial_context as Record<string, any> || {};
    // Buscamos si hay un valor de pérdida explícito, si no, calculamos un default
    const estimatedLoss = financial.estimated_cost || financial.loss_projection || 18500;
    const impactText = `$${estimatedLoss.toLocaleString('en-US')} USD PROJECTED RISK`;

    // c) Construcción de la Notificación Simulada (WhatsApp)
    const notification = {
      id: `notif-${Date.now()}`,
      message: `⚠️ URGENTE: ${snap.risk_level === 'critical' ? 'Riesgo Crítico' : 'Alerta'} Detectada`,
      impact: `$${estimatedLoss.toLocaleString('en-US')}`,
      action: snap.recommendation_text || "Revisar panel de control",
      timestamp: new Date(snap.created_at).toISOString()
    };

    // 4. RESPUESTA FINAL
    const responseData: DashboardResponse = {
      score: score,
      impact: impactText,
      evaluation: snap.scenario_description || "Sin descripción disponible.",
      mitigationSteps: snap.recommendation_text 
        ? [snap.recommendation_text, "Revisar métricas asociadas"] 
        : ["Analizar situación actual"],
      notifications: [notification]
    };

    return NextResponse.json(responseData);

  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(DEMO_DATA, { status: 500 });
  }
}