export async function fetchNewToken(clientId: string): Promise<string> {
  // TODO move to api
  const response = await fetch('/oauth2/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ clientId }),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch token: HTTP ${response.status}`);
  }

  const data = await response.json();
  return data.access_token;
}