export const initFacebookSDK = () => {
  return new Promise(resolve => {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: '567022959152358',
        cookie: true,
        xfbml: true,
        version: 'v10.0',
      });
      resolve(true);
    };

    (function (d, s, id) {
      const fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      const js = d.createElement(s) as HTMLScriptElement;
      js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      fjs.parentNode?.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
  });
};

export const handleFacebookLogin = () =>
  new Promise<{
    email: string;
    first_name: string;
    last_name: string;
    provider_id: string;
  } | null>(resolve => {
    window.FB.login(
      (response: any) => {
        if (response.authResponse) {
          window.FB.api(
            '/me',
            { fields: 'id,first_name,last_name,email' },
            (userInfo: any) => {
              resolve({
                email: userInfo.email,
                first_name: userInfo.first_name,
                last_name: userInfo.last_name,
                provider_id: userInfo.id,
              });
            }
          );
        } else {
          resolve(null);
        }
      },
      { scope: 'email' }
    );
  });
