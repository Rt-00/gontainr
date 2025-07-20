import { useState } from "react";
import { Header } from "../components/Header";
import { ContainerList } from "../components/ContainerList";

export const Dashboard = () => {
  const [currentView, setCurrentView] = useState<"containers">("containers");

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {currentView === "containers" && <ContainerList />}
      </main>
    </div>
  );
};
