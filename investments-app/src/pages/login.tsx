import { useState } from 'react';
import { fetchNewToken } from '../api/token';
import { useNavigate } from 'react-router';
import { AuthLogin } from '../components/auth/auth-login';

export function Login() {
  const navigate = useNavigate();
  const [clientId, setClientId] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const access_token = await fetchNewToken(clientId);
    sessionStorage.setItem('access_token', access_token);
    sessionStorage.setItem('client_id', clientId);
    navigate('/');
  };

  return (
    <AuthLogin
      clientId={clientId}
      onClientIdChange={setClientId}
      onSubmit={handleSubmit}
    />
  );
}
