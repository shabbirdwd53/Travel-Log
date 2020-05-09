const API_URL = "http://localhost:5000";

export async function listEntries() {
    const response = await fetch(`${API_URL}/api/entry`);
    return await response.json();
}