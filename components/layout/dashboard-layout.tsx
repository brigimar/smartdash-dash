import { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen bg-background">
      
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border p-4">
        <h2 className="text-lg font-semibold mb-4">Sidebar</h2>
        <ul className="space-y-2">
          <li className="hover:text-primary cursor-pointer">Dashboard</li>
          <li className="hover:text-primary cursor-pointer">Riesgos</li>
          <li className="hover:text-primary cursor-pointer">Reportes</li>
          <li className="hover:text-primary cursor-pointer">Configuración</li>
        </ul>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
