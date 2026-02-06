import { WelcomeScreen } from "@/components/welcome-screen";

interface PageProps {
  searchParams: { segmento?: string };
}

export default function DemoPage({ searchParams }: PageProps) {
  const segmento = searchParams.segmento;

  return (
    <WelcomeScreen
      initialMode="casos"
      segmento={segmento}
    />
  );
}


