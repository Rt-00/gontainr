class ApiService {
  private baseURL = "http://localhost:8080/api/v1";

  async login(username: string, password: string) {
    const response = await fetch(`${this.baseURL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) throw new Error("Login failed");

    return response.json();
  }
}

export const api = new ApiService();
