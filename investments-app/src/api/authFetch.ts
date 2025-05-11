export async function authFetch(
    input: RequestInfo,
    init: RequestInit = {}
  ): Promise<Response> {
    const token = sessionStorage.getItem('access_token');
    const headers = new Headers(init.headers || {});
    headers.set('Authorization', `Bearer ${token}`);
    headers.set('Content-Type', 'application/json');
  
   return fetch(input, { ...init, headers });

  }
  