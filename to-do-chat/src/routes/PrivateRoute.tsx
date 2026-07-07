import { useEffect, useState, type ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { getUserCookie } from '../services/getUserCookie/getUserCookie';

interface PrivateRouteProps {
  children: ReactNode;
  allowedRoles?: string[];
}

export const PrivateRoute = ({ children, allowedRoles }: PrivateRouteProps) => {
  const [status, setStatus] = useState<'loading' | 'allowed' | 'denied'>('loading');

  useEffect(() => {
    let isMounted = true;

    const validate = async () => {
      try {
        const user = await getUserCookie();
        const canAccess = !allowedRoles || allowedRoles.includes(user.role);

        if (isMounted) {
          setStatus(canAccess ? 'allowed' : 'denied');
        }
      } catch {
        if (isMounted) {
          setStatus('denied');
        }
      }
    };

    validate();

    return () => {
      isMounted = false;
    };
  }, [allowedRoles]);

  if (status === 'loading') {
    return <div className="text-white p-4">Carregando...</div>;
  }

  if (status === 'denied') {
    localStorage.clear();
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
