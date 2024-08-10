import Keycloak from 'keycloak-js';
import axios from 'axios';
import {BASE_URL}from '../Const/API_url.json'
const keycloak = new Keycloak({
    url: 'http://localhost:8080',
    realm: 'LocationVoitures',
    clientId: 'react-client'
});

const initKeycloak = (onAuthenticated) => {
    keycloak.init({ 
        onLoad: 'check-sso', 
        checkLoginIframe: false, // Changed to false to prevent automatic login
        pkceMethod: 'S256',
        silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html'
    }).then(authenticated => {
        if (authenticated) {
            onAuthenticated();
            sendUserDataToBackend();
        }
        // Removed the automatic login if not authenticated
    }).catch(error => {
        console.error('Failed to initialize Keycloak', error);
    });
};

const sendUserDataToBackend = async () => {
    if (!keycloak.hasRealmRole('adminRole')){
    try {
        const userProfile = await keycloak.loadUserProfile();
        const clientData = {
            nom: userProfile.lastName || '',
            prenom: userProfile.firstName || '',
            cin: userProfile.attributes?.cin?.[0] || '', // You might need to add this field to Keycloak or prompt the user for it
            email: userProfile.email,
            numTel: userProfile.attributes?.numTel?.[0] || '' // Assuming phone number is stored as a custom attribute
        };

        // Check if client already exists in the database
        const response = await axios.get(BASE_URL+`client/check?email=${clientData.email}`);
        if (!response.data.exists) {
            // Client does not exist, save new client data
            const formDataApi = new FormData();
            formDataApi.append('client', JSON.stringify(clientData));
            await axios.post(BASE_URL+'client/ajouter', formDataApi, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('User data sent to backend successfully');
        } else {
            console.log('Client already exists in the database');
        }
    } catch (error) {
        console.error('Failed to send user data to backend', error);
    }}
};

const doLogin = () => keycloak.login();
const doLogout = () => keycloak.logout();
const getToken = () => keycloak.token;
const isAuthenticated = () => keycloak.authenticated;

export { keycloak, initKeycloak, doLogin, doLogout, getToken, isAuthenticated };
