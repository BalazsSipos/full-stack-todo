import { AutoMap } from '@automapper/classes'
import { IsEmail, IsString } from 'class-validator'

export class CreateUserDto {
  @IsEmail()
  @AutoMap()
  public email: string

  @IsString()
  @AutoMap()
  public name: string

  @IsString()
  @AutoMap()
  public password: string
}

export class UserRpDto {
  @AutoMap()
  id: string
  @AutoMap()
  email: string
  @AutoMap()
  name: string
  @AutoMap()
  image?: string
  numberOfTodos: number
}
