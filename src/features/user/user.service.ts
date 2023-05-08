import { Injectable, Logger, UnauthorizedException } from '@nestjs/common'
import { PrismaService } from 'src/database/prisma.service'

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
}
