// lib/engine/risk-engine.ts
import { RiskSignal } from '@/lib/domain/risk';

export class RiskEngine {
  // Calcula score basado en señales (útil para el Wizard interactivo)
  static calculateScore(signals: RiskSignal[]): number {
    if (!signals.length) return 0;

    // Lógica simple: Suma ponderada
    let totalScore = 0;
    let totalWeight = 0;

    for (const signal of signals) {
      const weight = signal.weight || 1;
      const value = typeof signal.value === 'number' ? signal.value : 50; // Default 50 si no es numérico
      
      totalScore += value * weight;
      totalWeight += weight;
    }

    return totalWeight > 0 ? Math.round(totalScore / totalWeight) : 0;
  }

  static determineLevel(score: number): string {
    if (score >= 80) return 'critical';
    if (score >= 60) return 'high';
    if (score >= 40) return 'medium';
    return 'low';
  }
}