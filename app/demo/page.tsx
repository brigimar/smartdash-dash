import WelcomeScreen from "@/components/welcome-screen";

export const dynamic = "force-dynamic";

interface DemoPageProps {
  searchParams: { segmento?: string };
}

export default function DemoPage({ searchParams }: DemoPageProps) {
  const segmento = searchParams.segmento;

  return (
    <WelcomeScreen
      initialMode="casos"
      segmento={segmento}
    />
  );
}


