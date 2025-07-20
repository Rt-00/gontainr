import { useState } from "react";
import { ContainerList } from "../components/ContainerList";
import { Header } from "../components/Header";

export const Dashboard = () => {
  const [currentView, setCurrentView] = useState<"containers" | "logs">(
    "containers"
  );
  const [selectedContainer, setSelectedContainer] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const handleViewLogs = (id: string, name: string) => {
    setSelectedContainer({ id, name });
    setCurrentView("logs");
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {currentView === "containers" && (
          <ContainerList onViewLogs={handleViewLogs} />
        )}

        {currentView === "logs" && selectedContainer && <p>Logs Viewer...</p>}
      </main>
    </div>
  );
};
