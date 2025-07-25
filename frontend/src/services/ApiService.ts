import type { Container } from "../type/Container";
import type { LogEntry } from "../type/LogEntry";

class ApiService {
  private baseURL = "http://localhost:8080/api/v1";

  private getAuthHeaders(): Record<string, string> {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  async login(username: string, password: string) {
    const response = await fetch(`${this.baseURL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) throw new Error("Login failed");

    return response.json();
  }

  async getContainers(): Promise<Container[]> {
    const response = await fetch(`${this.baseURL}/containers`, {
      headers: {
        "Content-Type": "application/json",
        ...this.getAuthHeaders(),
      },
    });

    if (!response.ok) throw new Error("Failed to fetch containers");

    return response.json();
  }

  async stopContainer(id: string) {
    const response = await fetch(`${this.baseURL}/containers/${id}/stop`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...this.getAuthHeaders(),
      },
    });

    if (!response.ok) throw new Error("Failed to stop container");

    return response.json();
  }

  async startContainer(id: string) {
    const response = await fetch(`${this.baseURL}/containers/${id}/start`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...this.getAuthHeaders(),
      },
    });

    if (!response.ok) throw new Error("Failed to start container");

    return response.json();
  }

  async getLogs(id: string): Promise<LogEntry[]> {
    const response = await fetch(`${this.baseURL}/containers/${id}/logs`, {
      headers: {
        "Content-Type": "application/json",
        ...this.getAuthHeaders(),
      },
    });

    if (!response.ok) throw new Error("Failed to fetch logs");

    return response.json();
  }
}

export const api = new ApiService();
