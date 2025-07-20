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

  const stopContainer = async (id: string) => {
    try {
      await api.stopContainer(id);
      await fetchContainers();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to stop container");
    }
  };

  const startContainer = async (id: string) => {
    try {
      await api.startContainer(id);
      await fetchContainers();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to start container"
      );
    }
  };

  useEffect(() => {
    fetchContainers();
  }, []);

  return {
    containers,
    loading,
    error,
    stopContainer,
    startContainer,
    refetch: fetchContainers,
  };
};
