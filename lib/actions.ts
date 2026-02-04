'use server';

import { neon } from '@neondatabase/serverless';
import { revalidatePath } from 'next/cache';

// FV: Conexión estricta a Neon
const sql = neon(process.env.DATABASE_URL!);

// Blindaje contra "Object as React Child" y Nulos
const v_json = (d: any, fb: any = []) => {
  if (!d) return fb;
  return (typeof d === 'object') ? d : JSON.parse(d);
};

// 1. ESCENARIOS - Usando Vista v_latest_risks (FV Confirmada)
export async function getScenariosFromDB(clientId: string) {
  try {
    const data = await sql`
      SELECT 
        id, scenario_id, vertical,
        scenario_description as description, 
        global_score as score,
        risk_level, signals, financial_context,
        recommendation_text, action_status as status,
        created_at
      FROM v_latest_risks
      WHERE client_id = ${clientId}
      ORDER BY created_at DESC
    `;
    return data.map(r => ({
      ...r,
      signals: v_json(r.signals),
      financial_context: v_json(r.financial_context, {})
    }));
  } catch (e) { console.error("Error FV-SQL:", e); return []; }
}

// 2. DASHBOARD - Usando Vista v_client_risk_summary
export async function getDashboardData() {
  try {
    return await sql`
      SELECT 
        client_id, name as client_name, company, segment,
        critical_risks, high_risks, avg_risk_score
      FROM v_client_risk_summary
      ORDER BY critical_risks DESC
    `;
  } catch (e) { return []; }
}

// 3. HISTORIAL - Corrección: risk_snapshots NO tiene mitigation_plan
export async function getHistoryFromDB(clientId: string) {
  try {
    const data = await sql`
      SELECT 
        id, global_score, risk_level, 
        scenario_description, signals, created_at
      FROM risk_snapshots 
      WHERE client_id = ${clientId}
      ORDER BY created_at DESC
    `;
    return data.map(r => ({ ...r, signals: v_json(r.signals) }));
  } catch (e) { return []; }
}

// 4. PERSISTENCIA - Mapeo exacto a 'capturas_riesgo'
export async function saveRiskAnalysis(data: any) {
  try {
    // FV: Usamos los nombres exactos: descripcion_escenario, puntaje_global, estado_accion
    await sql`
      INSERT INTO capturas_riesgo (
        client_id, scenario_id, descripcion_escenario, vertical,
        puntaje_global, nivel_riesgo, signals, financial_context,
        mitigation_plan, texto_recomendacion, estado_accion
      ) VALUES (
        ${data.client_id}, ${data.scenario_id}, ${data.description}, 
        ${data.vertical}, ${data.score}, ${data.risk_level}, 
        ${data.signals}, ${data.financial_context}, 
        ${data.mitigation_plan}, ${data.recommendation_text},
        'pending'
      )
    `;
    revalidatePath('/dashboard');
    return { success: true };
  } catch (e) { 
    console.error("Error persistencia FV:", e); 
    return { success: false }; 
  }
}