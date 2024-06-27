import { IsEmail, IsEnum, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsInt()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsEnum(['ADMIN', 'ENGINEER', 'INTERN', 'USER'], {
    message: 'Valid role required',
  })
  role: string;
}
