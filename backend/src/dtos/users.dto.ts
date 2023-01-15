import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  public name: string;

  @IsString()
  public password: string;
}

export interface UserRpDto {
  id: string;
  email: string;
  name: string;
  image?: string;
  numberOfTodos: number;
}
