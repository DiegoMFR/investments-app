import { useEffect, useState } from 'react';
import { fetchNewToken } from '../api/token';
import { isTokenExpired } from '../utils/utils';

export function useAuthToken(redirectIfInvalid = true) {
  const [tokenReady, setTokenReady] = useState<boolean | null>(null);

  useEffect(() => {
    const token = sessionStorage.getItem('access_token');
    const clientId = sessionStorage.getItem('client_id');

    if (!clientId) {
      setTokenReady(false);
      return;
    }

    if (token && !isTokenExpired(token)) {
      setTokenReady(true);
      return;
    }

    if (token) {
      sessionStorage.removeItem('access_token');
    }

    fetchNewToken(clientId)
      .then(newToken => {
        sessionStorage.setItem('access_token', newToken);
        setTokenReady(true);
      })
      .catch(err => {
        console.error(err);
        setTokenReady(false);
        return;
      });
  }, [redirectIfInvalid]);

  return tokenReady;
}
