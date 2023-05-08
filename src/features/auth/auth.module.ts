import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { LocalStrategy } from './strategies/loca.strategy'
import { UserModule } from 'src/features/user/user.module'
import { JwtModule } from '@nestjs/jwt/dist'

import { jwtConfig } from 'src/config/jwtConfig'
import { JwtStrategy } from './strategies/jwt.strategy'

@Module({
  imports: [UserModule, JwtModule.register(jwtConfig)],
  controllers: [AuthController],
  exports: [AuthService],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
