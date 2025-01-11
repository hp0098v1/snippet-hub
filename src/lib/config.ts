export const config = {
  env: {
    database: {
      url: process.env.DATABASE_URL,
      blobReadWriteToken: process.env.BLOB_READ_WRITE_TOKEN,
    },
    session: {
      secret: process.env.SESSION_SECRET,
    },
    email: {
      resendApiKey: process.env.RESEND_API_KEY,
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
  routes: {
    auth: {
      login: (callbackUrl?: string) =>
        `/login${callbackUrl ? `?callbackUrl=${encodeURIComponent(callbackUrl)}` : ""}`,
      signUp: () => "/sign-up",
      verifyEmail: (email: string) =>
        `/verify-email?email=${encodeURIComponent(email)}`,
      forgotPassword: () => "/forgot-password",
      resetPassword: (token: string) =>
        `/reset-password?token=${encodeURIComponent(token)}`,
    },
    public: {
      home: () => "/",
      contact: () => "/contact",
      legal: () => "/legal",
      users: () => "/users",
      usersProfile: (username: string) => `/users/${username}`,
      snippets: () => "/snippets",
      snippetsDetail: (id: string) => `/snippets/${id}`,
    },
    dashboard: {
      home: () => "/dashboard",
      settings: {
        profile: () => "/dashboard/settings/profile",
        changePassword: () => "/dashboard/settings/change-password",
      },
      savedSnippets: () => "/dashboard/saved-snippets",
      snippets: {
        create: () => "/dashboard/snippets/create",
        edit: (id: string) => `/dashboard/snippets/${id}/edit`,
      },
    },
  },
  author: {
    name: "Erfan Paya",
    email: "hp0098v1@gmail.com",
    site: "https://portfolio-hp0098v1.vercel.app",
    github: "https://github.com/hp0098v1",
    linkedin: "https://www.linkedin.com/in/hp0098v1",
    telegram: "https://t.me/hp0098v1",
  },
  project: {
    name: "Snippet Hub",
    description: "A platform for sharing and discovering code snippets.",
    version: "1.0.0",
    github: "https://github.com/hp0098v1/snippet-hub",
  },
};
