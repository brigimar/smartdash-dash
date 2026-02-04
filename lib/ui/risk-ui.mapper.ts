// lib/ui/risk-ui.mapper.ts
import { RiskSnapshot, RiskEvaluation, RiskLevel } from '@/lib/domain/risk';

export const RiskUiMapper = {
  // Convierte el Nivel de Riesgo (DB) a Color (Hex)
  getLevelColor(level: string): string {
    switch (level?.toLowerCase()) {
      case 'critical': return '#EF4444'; // Red-500
      case 'high':     return '#F97316'; // Orange-500
      case 'medium':   return '#F59E0B'; // Amber-500
      case 'low':      return '#10B981'; // Emerald-500
      default:         return '#94A3B8'; // Slate-400
    }
  },

  // Obtiene el texto de impacto formateado (ej: "$18,500 USD")
  getImpactText(snapshot: RiskSnapshot): string {
    const context = snapshot.financial_context || {};
    // Busca varios posibles nombres de campo para el costo
    const amount = context.estimated_cost ?? context.loss_projection ?? 0;
    
    if (amount === 0) return "Sin impacto financiero estimado";
    
    return `$${amount.toLocaleString('en-US')} USD PROJECTED RISK`;
  },

  // Transforma el Snapshot de DB a la Evaluación para el componente Gauge
  toEvaluation(snapshot: RiskSnapshot): RiskEvaluation {
    return {
      score: snapshot.global_score,
      level: snapshot.risk_level as RiskLevel,
      summary: snapshot.scenario_description || "Sin descripción disponible",
      recommendations: snapshot.recommendation_text ? [snapshot.recommendation_text] : [],
      color: this.getLevelColor(snapshot.risk_level),
    };
  }
};
