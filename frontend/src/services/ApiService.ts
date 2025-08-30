import type { Container } from "../type/Container";
import type { LogEntry } from "../type/LogEntry";

class ApiService {
  private baseURL = "http://localhost:8080/api/v1";

  async login(username: string, password: string) {
    const response = await fetch(`${this.baseURL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
      credentials: "include",
    });

    if (!response.ok) throw new Error("Login failed");

    return response.json();
  }

  async getMe() {
    const response = await fetch(`${this.baseURL}/auth/me`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) throw new Error("Not authenticated");

    return response.json();
  }

  async logout() {
    const response = await fetch(`${this.baseURL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });

    if (!response.ok) throw new Error("Logout failed");

    return response.json();
  }

  async getContainers(): Promise<Container[]> {
    const response = await fetch(`${this.baseURL}/containers`, {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) throw new Error("Failed to fetch containers");

    return response.json();
  }

  async stopContainer(id: string) {
    const response = await fetch(`${this.baseURL}/containers/${id}/stop`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) throw new Error("Failed to stop container");

    return response.json();
  }

  async startContainer(id: string) {
    const response = await fetch(`${this.baseURL}/containers/${id}/start`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) throw new Error("Failed to start container");

    return response.json();
  }

  async getLogs(id: string): Promise<LogEntry[]> {
    const response = await fetch(`${this.baseURL}/containers/${id}/logs`, {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) throw new Error("Failed to fetch logs");

    return response.json();
  }
}

export const api = new ApiService();
