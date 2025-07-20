import { useEffect, useState } from "react";
import { api } from "../services/ApiService";
import type { Container } from "../type/Container";

export const useContainers = () => {
  const [containers, setContainers] = useState<Container[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchContainers = async () => {
    try {
      setLoading(true);
      const data = await api.getContainers();
      setContainers(data);
      setError(null);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch containers"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContainers();
  }, []);

  return {
    containers,
    loading,
    error,
    refetch: fetchContainers,
  };
};
