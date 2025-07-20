import { useLogs } from "../hooks/useLogs";

export const LogsViewer = ({
  containerId,
  containerName,
  onClose,
}: {
  containerId: string;
  containerName: string;
  onClose: () => void;
}) => {
  const { error, refetch, loading, logs } = useLogs(containerId);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-white">Logs: {containerName}</h2>
        <div className="flex gap-2">
          <button
            onClick={refetch}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
          >
            Refresh
          </button>
          <button
            onClick={onClose}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md"
          >
            Close
          </button>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
        {loading && (
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
          </div>
        )}

        {error && <div className="text-red-400 text-center py-4">{error}</div>}

        {!loading && !error && (
          <div className="bg-black rounded p-4 h-[650px] overflow-y-auto font-mono text-sm">
            {logs.length === 0 ? (
              <div className="text-gray-400">No logs available</div>
            ) : (
              logs.map((log, index) => (
                <div key={index} className="text-gray-300 mb-1">
                  <span className="text-gray-500">
                    {new Date(log.timestamp).toLocaleTimeString()}
                  </span>{" "}
                  <span className="text-green-400">
                    <pre>
                      <code>{log.message}</code>
                    </pre>
                  </span>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};
