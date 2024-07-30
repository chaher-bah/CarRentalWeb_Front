import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
    url: 'http://localhost:8080/auth',
    realm: 'LocationVoitures',
    clientId: 'react-client',
});

const initKeycloak = (onAuthenticated) => {
    keycloak.init({ onLoad: 'login-required' }).then(authenticated => {
        if (authenticated) {
            onAuthenticated();
        } else {
            window.location.reload();
        }
    });
};

export { keycloak, initKeycloak };