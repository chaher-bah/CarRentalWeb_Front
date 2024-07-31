import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
    url: 'http://localhost:8080',
    realm: 'LocationVoitures',
    clientId: 'react-client',
});

const initKeycloak = (onAuthenticated) => {
    keycloak.init({ onLoad: 'login-required', checkLoginIframe: true, pkceMethod: 'S256' }).then(authenticated => {
        if (authenticated) {
            onAuthenticated();
        } else {
            keycloak.login();
        }
    });
};

const doLogin = () => keycloak.login();
const doLogout = () => keycloak.logout();
const getToken = () => keycloak.token;
const isAuthenticated = () => keycloak.authenticated;

export { keycloak, initKeycloak, doLogin, doLogout, getToken, isAuthenticated };
