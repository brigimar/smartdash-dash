// lib/services/risk.service.ts
import { sql } from '@/lib/db';
import { RiskSnapshot } from '@/lib/domain/risk';

export class RiskService {
  /**
   * Obtiene el último snapshot real de la DB.
   * Maneja nulos y conversiones de tipo.
   */
  static async getLatestSnapshot(clientId?: string): Promise<RiskSnapshot | null> {
    try {
      if (!sql) {
        console.warn("⚠️ RiskService: Sin conexión SQL.");
        return null;
      }

      // Query optimizada: Trae solo 1, ordenado por fecha
      // El filtro de clientId es opcional por ahora para que la demo siempre muestre algo
      const rows = await sql`
        SELECT 
          id, client_id, global_score, risk_level, 
          scenario_description, recommendation_text, recommendation_type,
          signals, financial_context, action_status, created_at
        FROM risk_snapshots
        ORDER BY created_at DESC
        LIMIT 1
      `;

      if (!rows || rows.length === 0) return null;

      const row = rows[0];

      // Mapping defensivo (DB -> Dominio)
      return {
        id: row.id,
        client_id: row.client_id,
        global_score: Number(row.global_score) || 0, // CRÍTICO: Convertir a number
        risk_level: row.risk_level,
        scenario_description: row.scenario_description,
        recommendation_text: row.recommendation_text,
        recommendation_type: row.recommendation_type,
        signals: (row.signals as any[]) || [],
        financial_context: (row.financial_context as any) || {},
        action_status: row.action_status || 'pending',
        created_at: row.created_at ? new Date(row.created_at).toISOString() : new Date().toISOString()
      };

    } catch (error) {
      console.error("❌ RiskService Error:", error);
      return null;
    }
  }

  /**
   * Marca una acción como completada en la DB
   */
  static async completeAction(snapshotId: string): Promise<boolean> {
      try {
          if(!sql) return false;
          await sql`
            UPDATE risk_snapshots 
            SET action_status = 'completed' 
            WHERE id = ${snapshotId}
          `;
          return true;
      } catch (e) {
          console.error("Error updating status:", e);
          return false;
      }
  }
}