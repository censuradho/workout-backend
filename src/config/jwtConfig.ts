import { JwtModuleOptions } from '@nestjs/jwt'
import { environment } from './environment'

export const jwtConfig: JwtModuleOptions = {
  secret: environment.jwtSecret,
  signOptions: {
    expiresIn: '30d',
  },
}

console.log(environment)
