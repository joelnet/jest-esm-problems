import fetch from "node-fetch";

export async function fetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error status: ${response.status}`);
  }
  return response.json();
}
