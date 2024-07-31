import { Navigate, Outlet } from 'react-router-dom';
import { keycloak, isAuthenticated } from '../Auth/KeycloakService.js';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';

const ProtectedAdminRoute = () => {
    const [shouldRedirect, setShouldRedirect] = useState(false);
  
    useEffect(() => {
      if (!isAuthenticated()) {
        console.log(keycloak);
        toast.error("Connectez-vous à votre compte d'abord.", {
          style: {
            fontSize: '2rem',
            fontWeight: '700',
            fontFamily: 'Roboto,sansSerif',
            border: '2px solid red'
          },
          duration: 7000
        });
        setShouldRedirect(true);
      } else if (!keycloak.hasRealmRole('adminRole')) {
        toast.error("Vous n'avez pas l'accès à cette partie.", {
          style: {
            fontSize: '2rem',
            fontWeight: '700',
            fontFamily: 'Roboto,sansSerif',
            border: '2px solid red'
          },
          duration: 7000
        });
        setShouldRedirect(true);
      }
    }, []);
  
    if (shouldRedirect) {
      return <Navigate to="/" replace />;
    }
  
    return isAuthenticated() && keycloak.hasRealmRole('adminRole') ? <Outlet /> : null;
  };
  
  export default ProtectedAdminRoute;