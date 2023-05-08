import * as bcrypt from 'bcrypt'

export function generateHash(text: string) {
  return bcrypt.hash(text, 10)
}

export function compareHash(text: string, compareText: string) {
  return bcrypt.compare(text, compareText)
}
