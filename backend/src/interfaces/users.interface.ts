import { CreateUserDto, UserRpDto } from 'dtos/users.dto'
import { UserEntity } from 'entity/users.entity'

export interface User {
  id: string
  email: string
  password: string
}

export interface UserService {
  findAllUser(): Promise<UserRpDto[]>
  findUserByEmail(email: string): Promise<UserRpDto>
  findUserEntityByEmail(email: string): Promise<UserEntity>
  createUser(userData: CreateUserDto): Promise<UserRpDto>
}
