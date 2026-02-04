// lib/domain/risk.ts

export type RiskLevel = 'critical' | 'high' | 'medium' | 'low' | 'stable';

// Estructura exacta de los JSONB en tu DB
export interface RiskSignal {
  id?: string;
  type: string;
  code?: string;
  value?: number | string;
  weight?: number;
  detected_at?: string;
  description?: string; // Para mostrar en UI
}

export interface FinancialContext {
  estimated_cost?: number;
  loss_projection?: number;
  currency?: string;
  [key: string]: any; // Flexibilidad para otros datos
}

// Entidad que representa la fila de DB
export interface RiskSnapshot {
  id: string;
  client_id: string | null;
  global_score: number; // Ya convertido a número
  risk_level: RiskLevel | string;
  scenario_description: string | null;
  recommendation_text: string | null;
  recommendation_type: string | null;
  signals: RiskSignal[];
  financial_context: FinancialContext;
  action_status: 'pending' | 'in_progress' | 'completed' | 'dismissed' | null;
  created_at: string; // ISO String
}

// Para el UI (Gauge y Tarjetas)
export interface RiskEvaluation {
  score: number;
  level: RiskLevel;
  summary: string;
  recommendations: string[];
  color: string;
}