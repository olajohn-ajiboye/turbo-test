import { loadGapiInsideDOM } from 'gapi-script';

const CLIENT_ID =
  '794219859975-qqj8op4qh49iqeu85aal619rfpl9m285.apps.googleusercontent.com';
const REDIRECT_URI = 'https://localhost:5173';

export const initGoogleSDK = () => {
  return loadGapiInsideDOM().then(() => {
    if (!window.gapi.auth2) {
      window.gapi.load('auth2', () => {
        window.gapi.auth2.init({
          client_id: CLIENT_ID,
          scope: 'profile email',
          ux_mode: 'redirect',
          redirect_uri: REDIRECT_URI,
        });
      });
    }
  });
};

// Unified function for Google Authentication (Login/Signup)
export const handleGoogleAuth = async () => {
  try {
    const auth2 = window.gapi.auth2.getAuthInstance();
    if (auth2) {
      const googleUser = await auth2.signIn();
      const profile = googleUser.getBasicProfile();
      return {
        email: profile.getEmail(),
        first_name: profile.getGivenName(),
        last_name: profile.getFamilyName(),
        provider_id: profile.getId(),
      };
    }
  } catch (error) {
    console.error('Google authentication error:', error);
    return null;
  }
};
