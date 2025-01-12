interface Window {
  FB: any; // For Facebook
  gapi: any; // For Google APIs
  fbAsyncInit: () => void; // Facebook SDK initialization

  google: {
    accounts: {
      id: {
        initialize: (config: {
          client_id: string;
          callback: (response: any) => void;
        }) => void;
        prompt: () => void;
      };
    };
  };
}
