import { Injectable } from '@nestjs/common'
import { UserService } from '../user/user.service'
import { JwtService } from '@nestjs/jwt'
import { CreateUserDto } from '../user/dto'
import { UserEntity } from '../user/entities'
import { UserPayload, UserToken } from './models'
import { compareHash } from 'src/utils/custom-bcrypt'
import { AUTH_ERROR_MESSAGES } from './constatns/error-messages'
import { UnauthorizedException } from 'src/exception'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async login(user: UserEntity): Promise<UserToken> {
    const payload: UserPayload = {
      sub: user.id,
      email: user.email,
      name: user.first_name,
    }

    return {
      access_token: this.jwtService.sign(payload),
    }
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email)

    const isValidPassword = await compareHash(password, user.password)

    if (!isValidPassword)
      throw new UnauthorizedException(
        AUTH_ERROR_MESSAGES.EMAIL_PASSWORD_INCORRECT
      )

    return {
      ...user,
      password: undefined,
    }
  }

  async signUp(data: CreateUserDto) {
    return await this.userService.create(data)
  }

  async revalidate(email: string) {
    const user = await this.userService.findByEmail(email)

    const payload: UserPayload = {
      sub: user.id,
      email: user.email,
      name: user.first_name,
      email_confirmed: user?.email_confirmed,
    }

    return {
      ...payload,
      access_token: this.jwtService.sign(payload),
    }
  }
}
