import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { IsPublic } from './decorators'
import { CreateUserDto } from '../user/dto'
import { LocalAuthGuard } from './guards/local-auth.guard'
import { AuthRequest } from './models'

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @IsPublic()
  @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  async login(@Request() request: AuthRequest) {
    return await this.service.login(request.user)
  }

  @IsPublic()
  @Post('sign-up')
  async signUp(@Body() body: CreateUserDto) {
    return await this.service.signUp(body)
  }
}
