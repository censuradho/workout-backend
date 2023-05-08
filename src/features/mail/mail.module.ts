import { Module, Global } from '@nestjs/common'
import { MailService } from './mail.service'
import { MailerModule } from '@nestjs-modules/mailer'
import { nodeMailConfig } from 'src/config/node-mail.config'

@Global()
@Module({
  providers: [MailService],
  imports: [MailerModule.forRoot(nodeMailConfig)],
  exports: [MailService],
})
export class MailModule {}
