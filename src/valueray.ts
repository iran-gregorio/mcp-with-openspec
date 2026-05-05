export async function valuerayRequest(endpoint: string, params: Record<string, string | undefined> = {}) {
  const url = new URL(`https://www.valueray.com/api/v1${endpoint}`);
  
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) {
      url.searchParams.append(key, value);
    }
  }

  const response = await fetch(url.toString(), {
    headers: {
      "Accept": "application/json"
    }
  });

  if (!response.ok) {
    let errorMsg = `Valueray API Error: ${response.status} ${response.statusText}`;
    if (response.status === 429) {
      errorMsg = "Valueray Rate Limit Exceeded (429). Please wait before making more requests.";
    }
    throw new Error(errorMsg);
  }

  return response.json();
}
