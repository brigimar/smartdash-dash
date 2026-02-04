// lib/services/risk.service.ts
"use server";

import { sql } from "@/lib/db";
import { RiskSnapshot } from "@/lib/domain/risk";

/**
 * Servicio de acceso a riesgos.
 *
 * RESPONSABILIDAD:
 * - Leer datos reales desde vistas/tablas
 * - Traducir snake_case (DB) → camelCase (dominio)
 * - NO contiene lógica de UI ni mocks
 */
export class RiskService {
  /**
   * Obtiene el último snapshot de riesgo disponible.
   * Usa la vista v_latest_risks como fuente única.
   */
  static async getLatestSnapshot(
    clientId?: string,
  ): Promise<RiskSnapshot | null> {
    try {
      const rows = await sql`
        SELECT
          id,
          client_id,
          scenario_id,
          scenario_description,
          vertical,
          global_score,
          risk_level,
          financial_context,
          signals,
          recommendation_type,
          recommendation_text,
          action_deadline,
          action_status,
          score_version,
          created_at,
          updated_at,
          client_name,
          client_company,
          client_segment
        FROM v_latest_risks
        ${clientId ? sql`WHERE client_id = ${clientId}` : sql``}
        ORDER BY created_at DESC
        LIMIT 1
      `;

      if (!rows || rows.length === 0) {
        return null;
      }

      const r = rows[0];

      // Traducción explícita DB → Dominio
      const snapshot: RiskSnapshot = {
        id: r.id,

        clientId: r.client_id,
        scenarioId: r.scenario_id,

        scenarioDescription: r.scenario_description,
        vertical: r.vertical,

        globalScore: Number(r.global_score) || 0,
        riskLevel: r.risk_level,

        financialContext: (r.financial_context ?? {}) as Record<string, unknown>,
        signals: (r.signals ?? []) as unknown[],

        recommendationType: r.recommendation_type,
        recommendationText: r.recommendation_text,

        actionDeadline: r.action_deadline
          ? new Date(r.action_deadline).toISOString()
          : null,

        actionStatus: r.action_status,

        scoreVersion: r.score_version,

        createdAt: new Date(r.created_at).toISOString(),
        updatedAt: new Date(r.updated_at).toISOString(),

        clientName: r.client_name,
        clientCompany: r.client_company,
        clientSegment: r.client_segment,
      };

      return snapshot;
    } catch (error) {
      console.error("❌ RiskService.getLatestSnapshot:", error);
      return null;
    }
  }

  /**
   * Marca una acción como completada.
   * Opera sobre la tabla real capturas_riesgo.
   */
  static async completeAction(snapshotId: string): Promise<boolean> {
    try {
      await sql`
        UPDATE capturas_riesgo
        SET action_status = 'completed',
            updated_at = NOW()
        WHERE id = ${snapshotId}
      `;
      return true;
    } catch (error) {
      console.error("❌ RiskService.completeAction:", error);
      return false;
    }
  }
}

