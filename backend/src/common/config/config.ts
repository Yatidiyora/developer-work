const getConfig = () => {
    return {
      AURORA_DB: {
        DATABASE: process.env.DB_DATABASE ?? '',
        USERNAME: process.env.DB_USERNAME ?? '',
        PASSWORD: process.env.DB_PASSWORD ?? '',
        HOST: process.env.DB_HOST,
        PORT: 3306,
      },
      SAML: {
        CALLBACK_URL: process.env.WFM_CALLBACK_URL,
        ENTRY_POINT: process.env.WFM_ENTRY_POINT,
        ISSUER: process.env.WFM_ISSUER,
        IDP_LOGOUT_URL: process.env.WFM_IDP_LOGOUT_URL,
        SP_LOGOUT_CALLBACK: process.env.WFM_SP_LOGOUT_CALLBACK,
        IPD_CERT: process.env.WFM_IDP_CERT,
      },
      FRONTEND: {
        AUTH_REDIRECT_URL: process.env.WFM_AUTH_REDIRECT_URL,
      },
      SECRET_KEY: process.env.WFM_JWT_SECRET_KEY || 'TOP_SECRET',
      TOKEN_MAX_AGE_VALUE_IN_HOURS: process.env.BANYAN_TOKEN_MAX_AGE_VALUE_IN_HOURS,
      TOKEN_EXPIRATION: process.env.BANYAN_WFM_JWT_TOKEN_EXPIRATION,
      AUTHENTICATION_KEY: process.env.BANYAN_AUTHENTICATION_KEY,
  };
};

export default getConfig;
  