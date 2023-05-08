import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import { FeaturesModule } from './features'
import { PrismaService } from './database/prisma.service'
import { JwtAuthGuard } from './features/auth/guards/jwt-auth.guard'
import { APP_GUARD } from '@nestjs/core'

@Module({
  imports: [ConfigModule.forRoot(), FeaturesModule],
  controllers: [AppController],
  providers: [
    PrismaService,
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
