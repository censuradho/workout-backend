import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { UserEntity } from 'src/features/user/entities'
import { AuthRequest } from 'src/features/auth/models'

export const CurrentUser = createParamDecorator(
  (data: string, context: ExecutionContext): UserEntity => {
    const request = context.switchToHttp().getRequest<AuthRequest>()

    const { user } = request

    return data ? user?.[data] : user
  }
)
