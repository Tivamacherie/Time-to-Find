window.CaseAPI = {
  // Routed through Vite dev proxy (/api -> http://localhost:3001/api) so both local & GitHub Codespaces work seamlessly
  baseUrl: "/api",

  async checkHealth() {
    const res = await fetch(`${this.baseUrl}/health`);
    if (!res.ok) throw new Error("Backend offline");
    return res.json();
  },

  async getCases() {
    const res = await fetch(`${this.baseUrl}/cases`);
    if (!res.ok) throw new Error("Failed to fetch case list");
    const data = await res.json();
    return data.cases;
  },

  async getCaseById(caseId) {
    const res = await fetch(`${this.baseUrl}/cases/${encodeURIComponent(caseId)}`);
    if (!res.ok) throw new Error("Failed to fetch case dossier");
    return res.json();
  },

  async accuseSuspect(caseId, payload) {
    const res = await fetch(`${this.baseUrl}/cases/${encodeURIComponent(caseId)}/accuse`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error("Failed to submit accusation to server");
    return res.json();
  }
};
