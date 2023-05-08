const env = process.env

export const environment = {
  jwtSecret: env.JWT_SECRET,
  port: env.PORT || 3333,
  host: '192.168.1.7',
  frontendBaseUrl: env.FRONTEND_BASE_URL,
  nodeMailer: {
    from: env.NODE_MAIL_FROM,
    host: env.NODE_MAILER_HOST,
    auth: {
      user: env.NODE_MAILER_AUTH_USER,
      password: env.NODE_MAILER_AUTH_PASS,
    },
  },
}
