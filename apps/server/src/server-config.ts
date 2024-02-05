export function getServerConfig() {
  const clientRootUrls = (process.env.APP_CLIENT_ROOT_URL ?? 'http://localhost:4200')
    .split(',')
    .map((u) => u.trim());
  return {
    // https://stackoverflow.com/questions/58090082/process-env-node-env-always-development-when-building-nestjs-app-with-nrwl-nx
    nodeEnv: process.env['NODE_ENV'] || 'development',
    //skipAuthentication: process.env.APP_SKIP_AUTHENTICATION === 'true',
    host: process.env.APP_HOST ?? 'localhost',
    // Heroku is using PORT env to specify the port
    port: process.env.PORT ? Number(process.env.PORT) ?? 5000 : 5000,

    mongoDBUri: process.env.APP_MONGODB ?? 'mongodb://localhost/teams2',

    graphQLSchemaPath: process.env.APP_GRAPHQL_SCHEMA_PATH ?? './dist/schema.graphql',
    email: {
      from: process.env.APP_EMAIL_FROM,
    },
    jwt: {
      secret: process.env.APP_JWT_SECRET,
    },

    clientAppRootUrl: clientRootUrls[0], // the first one is the primary
    clientAppRootUrlsForCORS: clientRootUrls,
    aws: {
      region: process.env.AWS_REGION,
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      s3bucket: process.env.AWS_BUCKET,
    },
    invoicing: {
      type: 'superfaktura',
      sf: {
        apiUrl: process.env.SF_API_URL,
        email: process.env.SF_AUTH_EMAIL,
        apiKey: process.env.SF_AUTH_API_KEY,
        companyId: process.env.SF_AUTH_COMPANY_ID,
        module: process.env.SF_AUTH_MODULE,
        payment_secret_key: process.env.SF_PAYMENT_KEY,
      },
    },
    app: {
      superadminUsername: process.env.SUPERADMIN_USERNAME,
    },
  };
}
