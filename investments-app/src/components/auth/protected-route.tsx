
import { ReactNode } from 'react';
import { useAuthToken } from '../../hooks/use-auth-token';
import { Navigate } from 'react-router';
import'./protected-route.css';

export function ProtectedRoute({ children }: { children: ReactNode }) {
    const tokenReady = useAuthToken();

    if (tokenReady === null) {
      return <div className="loading">Loading...</div>;
    }
  
    if (tokenReady === false) {
      return <Navigate to="/login" replace />;
    }
  
    return <>{children}</>;
  }