import { WelcomeScreen } from "@/components/welcome-screen";
import { getCasosTestigoBySegmento } from "@/lib/actions";

interface PageProps {
  searchParams: { segmento?: string };
}

export default async function DemoPage({ searchParams }: PageProps) {
  const segmento = searchParams.segmento;

  // 🔒 REGLA ABSOLUTA:
  // Sin segmento → SOLO Pantalla 1A (segmentos)
  if (!segmento) {
    return <WelcomeScreen />;
  }

  // Con segmento → Pantalla 1B (casos testigo)
  const casos = await getCasosTestigoBySegmento(segmento);

  return (
    <WelcomeScreen
      initialMode="casos"
      segmento={segmento}
      initialCasos={casos}
    />
  );
}


