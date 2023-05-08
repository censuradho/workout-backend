export class UserPayload {
  sub: string
  name: string
  email: string
  email_confirmed?: boolean
  iat?: number
  exp?: number
}
