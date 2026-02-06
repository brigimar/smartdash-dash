import { WelcomeScreen } from "@/components/welcome-screen";

interface PageProps {
  searchParams: { segmento?: string };
}

export default function DemoPage({ searchParams }: PageProps) {
  const segmento = searchParams.segmento;

  /**
   * REGLA DE ORO DEL FLUJO:
   * - Sin segmento → Pantalla 1A (segmentos)
   * - Con segmento → Pantalla 1B (casos testigo)
   */
  if (!segmento) {
    return <WelcomeScreen />;
  }

  return (
    <WelcomeScreen
      initialMode="casos"
      segmento={segmento}
    />
  );
}

