import type { Container } from "../type/Container";

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
}

export const api = new ApiService();
