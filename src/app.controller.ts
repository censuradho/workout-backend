import { Controller, Get, Request } from '@nestjs/common'
import { AuthService } from './features/auth/auth.service'
import { CurrentUser } from './features/auth/decorators/current-user.decorator'
import { AuthRequest } from './features/auth/models'
import { UserEntity } from './features/user/entities'

@Controller()
export class AppController {
  constructor(private readonly service: AuthService) {}

  @Get('me')
  async findMe(
    @CurrentUser() user: UserEntity,
    @Request() request: AuthRequest
  ) {
    const { ...rest } = await this.service.revalidate(user.email)

    request.user = {
      ...(rest as any as UserEntity),
    }

    return rest
  }
}
