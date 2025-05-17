import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { currentUser } = useAuth(); // Vérifie si l'utilisateur est connecté
  const location = useLocation();

  // Si l'utilisateur n'est pas connecté, redirige vers la page de connexion
  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Si l'utilisateur est connecté, affiche les enfants (contenu protégé)
  return <>{children}</>;
};

export default AuthGuard;