import { Request } from 'express'
import { UserEntity } from 'src/features/user/entities'

export interface AuthRequest extends Request {
  user: UserEntity
}
