import { useEffect, useState } from "react";
import { api } from "../services/ApiService";
import type { LogEntry } from "../type/LogEntry";

export const useLogs = (containerId: string | null) => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLogs = async () => {
    if (!containerId) return;

    try {
      setLoading(true);
      const data = await api.getLogs(containerId);
      setLogs(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch logs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (containerId) {
      fetchLogs();
      const interval = setInterval(fetchLogs, 2000); // Refresh every 2 seconds
      return () => clearInterval(interval);
    }
  }, [containerId]);

  return { logs, loading, error, refetch: fetchLogs };
};
