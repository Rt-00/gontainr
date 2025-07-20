import { Activity, Eye, Play, Square } from "lucide-react";
import { useContainers } from "../hooks/useContainers";

export const ContainerList = () => {
  const { refetch, containers, loading, error, stopContainer, startContainer } =
    useContainers();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-400 mb-4">{error}</div>
        <button
          onClick={refetch}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-white">Containers</h2>

        <button
          className="bg-gray-600 hover:bg-gray-700 text-white px-2 py-1 rounded-md flex
          items-center gap-2"
          onClick={refetch}
        >
          <Activity className="w-4 h-4" />
          Refresh
        </button>
      </div>

      <div className="grid gap-4">
        {containers.map((container) => (
          <div
            key={container.id}
            className="bg-gray-800 rounded-lg p-4 border border-gray-700"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-white">{container.name}</h3>
                <p className="text-sm text-gray-400">{container.image}</p>
                <p className="text-sm text-gray-400">ID: {container.id}</p>
                <span
                  className={`inline-block px-2 py-1 rounded text-xs font-medium mt-2 ${
                    container.status.includes("running") ||
                    container.status.includes("Up")
                      ? "bg-green-900 text-green-300"
                      : "bg-red-900 text-red-300"
                  }`}
                >
                  {container.status}
                </span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => startContainer(container.id)}
                  title="Start Container"
                  className="bg-green-600 hover:bg-green-700 text-white p-1 rounded-md"
                >
                  <Play className="h-4 w-4" />
                </button>

                <button
                  onClick={() => stopContainer(container.id)}
                  title="Stop Container"
                  className="bg-red-600 hover:bg-red-700 text-white p-1 rounded-md cursor-pointer"
                >
                  <Square className="h-4 w-4" />
                </button>

                <button
                  title="View Logs"
                  className="bg-blue-600 hover:bg-blue-700 text-white p-1 rounded-md"
                >
                  <Eye className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {containers.length === 0 && (
        <div className="text-center py-8 text-gray-400">
          No containers found
        </div>
      )}
    </div>
  );
};
