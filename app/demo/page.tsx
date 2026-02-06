import { WelcomeScreen } from "@/components/welcome-screen";
import { getCasosTestigoBySegmento } from "@/lib/actions";

interface PageProps {
  searchParams: { segmento?: string };
}

export default async function DemoPage({ searchParams }: PageProps) {
  const segmento = searchParams.segmento;

  // /demo → Pantalla 1A
  if (!segmento) {
    return <WelcomeScreen />;
  }

  // /demo?segmento=Startup → Pantalla 1B
  const casos = await getCasosTestigoBySegmento(segmento);

  return (
    <WelcomeScreen
      initialMode="casos"
      segmento={segmento}
      initialCasos={casos}
    />
  );
}



