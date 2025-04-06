export const environment = {
  auth: {
    domain: 'domain',
    clientId: 'clientid',
    authorizationParams: {
      redirect_uri: window.location.origin,
      audience: 'audience',
    },
    httpInterceptor: {
      allowedList: [
        // Attach access tokens to any calls to '/api' (exact match)
        '/api',
        // Attach access tokens to any calls that start with '/api/'
        '/api/*',
        {
          uri: 'uri',
          tokenOptions: {
            authorizationParams: {
              audience: 'audience',
              scope: 'scope',
            },
          },
        },
      ],
    },
  },
};
