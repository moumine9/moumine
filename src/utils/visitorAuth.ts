const STORAGE_KEY = "visitor_credentials";

export interface VisitorCredentials {
  name: string;
  email: string;
  timestamp: string;
}

export function saveVisitorCredentials(name: string, email: string): void {
  const credentials: VisitorCredentials = { name, email, timestamp: new Date().toISOString() };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(credentials));
}

export function getVisitorCredentials(): VisitorCredentials | null {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return null;
  try {
    return JSON.parse(stored) as VisitorCredentials;
  } catch {
    return null;
  }
}

export function isAuthenticated(): boolean {
  return getVisitorCredentials() !== null;
}

export async function sendCredentialsToAPI(credentials: VisitorCredentials): Promise<void> {
  const endpoint = (import.meta as any).env?.VITE_VISITOR_API_ENDPOINT;
  if (!endpoint) return;

  try {
    await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
  } catch (err) {
    console.warn("Failed to send visitor credentials to API:", err);
  }
}
