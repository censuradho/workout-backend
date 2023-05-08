import { MailerOptions } from '@nestjs-modules/mailer'
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'
import { join } from 'node:path'
import { environment } from './environment'

export const nodeMailConfig: MailerOptions = {
  transport: {
    host: environment.nodeMailer.host,
    secure: false,
    port: 587,
    auth: {
      user: environment.nodeMailer.auth.user,
      pass: environment.nodeMailer.auth.password,
    },
  },

  defaults: {
    from: `"No Reply" <${environment.nodeMailer.from}>`,
  },
  template: {
    dir: join(__dirname, '..', 'mail', 'templates'),
    adapter: new HandlebarsAdapter(),
    options: {
      strict: true,
    },
  },
}
