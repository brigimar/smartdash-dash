import { WelcomeScreen } from "@/components/welcome-screen";

export const dynamic = "force-dynamic";

interface PageProps {
  searchParams?: {
    segmento?: string;
  };
}

export default function DemoPage({ searchParams }: PageProps) {
  const segmento = searchParams?.segmento;

  return (
    <WelcomeScreen
      initialMode={segmento ? "casos" : "clientes"}
      segmento={segmento}
    />
  );
}

