// lib/data.ts
import { RiskSnapshot } from '@/lib/domain/risk';

export const MOCK_RISK_SNAPSHOT: RiskSnapshot = {
  id: 'mock-1',

  clientId: 'demo-client',
  scenarioId: 'SCN-LIQ-001',

  scenarioDescription: 'Falta de liquidez inminente para nómina.',
  vertical: 'finance',

  globalScore: 82.4,
  riskLevel: 'critical',

  signals: [
    {
      type: 'financial',
      code: 'CASH_FLOW',
      value: 85,
      description: 'Flujo de caja negativo proyectado',
    },
  ],

  financialContext: {
    estimated_cost: 18500,
    currency: '$',
  },

  recommendationType: 'financial_action',
  recommendationText: 'Contactar clientes clave hoy para asegurar cobros.',

  actionDeadline: null,
  actionStatus: 'pending',

  scoreVersion: 'v1',

  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),

  clientName: 'Cliente Demo',
  clientCompany: 'Demo Corp',
  clientSegment: 'SME',
};
