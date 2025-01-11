export const config = {
  env: {
    database: {
      url: process.env.DATABASE_URL,
      blobReadWriteToken: process.env.BLOB_READ_WRITE_TOKEN,
    },
    session: {
      secret: process.env.SESSION_SECRET,
    },
    smtp: {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      user: process.env.SMTP_USER,
      password: process.env.SMTP_PASSWORD,
    },
    app: {
      url: process.env.APP_URL,
    },
  },
};
