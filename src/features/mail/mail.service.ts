import { MailerService } from '@nestjs-modules/mailer'
import { User } from '@prisma/client'
import { Injectable } from '@nestjs/common'

import { appSettings } from 'src/config/app'

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendUserConfirmation(user: User, token: string) {
    const { authRecoveryUrl, env } = appSettings

    const url = `${env.frontendBaseUrl}${authRecoveryUrl}/${token}`

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Bem-vindo a IZ FIT! Confirme seu email',
      template: './confirmation',
      date: new Date(),
      from: appSettings.env.nodeMailer.from,
      context: {
        name: `${user.first_name} ${user.last_name}`,
        url,
        from: appSettings.env.nodeMailer.from,
      },
    })
  }

  async sendForgottenPassword(user: User, token: string) {
    const { recoveryPassword, env } = appSettings

    const url = `${env.frontendBaseUrl}${recoveryPassword}/${token}`

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Alteração de senha',
      template: './reset-password',
      date: new Date(),
      from: appSettings.env.nodeMailer.from,
      context: {
        name: `${user.first_name} ${user.last_name}`,
        url,
        from: appSettings.env.nodeMailer.from,
      },
    })
  }
}
