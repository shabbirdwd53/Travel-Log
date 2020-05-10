const API_URL = "http://localhost:5000";

export async function listEntries() {
  const response = await fetch(`${API_URL}/api/entry`);
  return await response.json();
}

export async function createEntry(entry) {
  const response = await fetch(`${API_URL}/api/entry`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(entry),
  });
  return await response.json();
}
