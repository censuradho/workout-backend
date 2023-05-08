import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { UserEntity } from 'src/features/user/entities';

export class CreateUserDto extends UserEntity {
  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(40)
  password: string;
}
