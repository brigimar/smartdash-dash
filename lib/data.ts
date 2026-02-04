// lib/data.ts
import { RiskSnapshot } from '@/lib/domain/risk';

export const MOCK_RISK_SNAPSHOT: RiskSnapshot = {
  id: 'mock-1',
  client_id: 'demo-client',
  global_score: 82.4,
  risk_level: 'critical',
  scenario_description: 'Falta de liquidez inminente para nómina.',
  recommendation_text: 'Contactar clientes clave hoy para asegurar cobros.',
  recommendation_type: 'financial_action',
  action_status: 'pending',
  created_at: new Date().toISOString(),
  signals: [
    { type: 'financial', code: 'CASH_FLOW', value: 85, description: 'Flujo de caja negativo proyectado' }
  ],
  financial_context: {
    estimated_cost: 18500,
    currency: 'USD'
  }
};