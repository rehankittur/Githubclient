// authProvider.js
import { MsalAuthProvider, LoginType } from 'react-aad-msal';

// Msal Configurations
const config = {
  auth: {
    authority: 'https://login.microsoftonline.com/4eefdee3-6662-4480-b2ba-a102df9c5160',
    clientId: '23089bcf-1533-4191-9e27-836786569e41',
    // redirectUri: 'http://localhost:3000/',
    redirectUri: 'https://uniteemployeeapp-tst-dev.azurewebsites.net/',
  },
  cache: {
    cacheLocation: "localStorage",
    // Set to false to prevent 431
    // https://github.com/AzureAD/microsoft-authentication-library-for-js/issues/1316#issuecomment-593624176
    storeAuthStateInCookie: false
  }
};

// Authentication Parameters
const authenticationParameters = {
  scopes: [
    'profile',
    'User.Read',
    'AllSites.Read',
  ]
}

// Options
const options = {
  loginType: LoginType.Redirect,
  tokenRefreshUri: window.location.origin + '/auth.html'
}

export const activeDirectoryAuthProvider = new MsalAuthProvider(config, authenticationParameters, options)