// Modifiez votre fichier ProtectedRoute.jsx pour qu'il ne vérifie pas l'authentification
// mais définisse automatiquement le rôle en fonction de l'URL

import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles }) => {
  const location = useLocation();
  const path = location.pathname;
  
  // Définir le rôle automatiquement en fonction de l'URL
  useEffect(() => {
    let role = 'EMPLOYEE'; // Valeur par défaut
    
    // Détecter le rôle à partir de l'URL
    if (path.startsWith('/admin')) {
      role = 'ADMIN';
    } else if (path.startsWith('/superadmin')) {
      role = 'SUPERADMIN';
    } else if (path.startsWith('/employee')) {
      role = 'EMPLOYEE';
    }
    
    // Sauvegarder dans localStorage pour que le reste de l'application fonctionne
    localStorage.setItem('role', role);
    localStorage.setItem('token', 'bypass-token'); // Token fictif
    localStorage.setItem('nom', role); // Nom basé sur le rôle
    
    console.log('URL path:', path);
    console.log('Role set to:', role);
  }, [path]);
  
  // Plus de redirection - simplement afficher la page demandée
  return <Outlet />;
};

export default ProtectedRoute;