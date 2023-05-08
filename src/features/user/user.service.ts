import { Injectable, Logger, UnauthorizedException } from '@nestjs/common'
import { PrismaService } from 'src/database/prisma.service'
import { CreateUserDto } from './dto'
import { USER_ERROR_MESSAGES } from './errors-messages'
import { generateHash } from 'src/utils/custom-bcrypt'
import { randomUUID } from 'crypto'

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(payload: CreateUserDto) {
    const { email, first_name, last_name, password } = payload

    const userExist = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (userExist)
      throw new UnauthorizedException(USER_ERROR_MESSAGES.USER_ALREADY_REGISTER)

    const hashPassword = await generateHash(password)

    const user = await this.prisma.user.create({
      data: {
        id: randomUUID(),
        email,
        first_name,
        last_name,
        password: hashPassword,
      },
    })

    return {
      ...user,
      password: undefined,
    }
  }

  async findByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!user) throw new UnauthorizedException(USER_ERROR_MESSAGES.NOT_FOUND)

    return user
  }
}
