import { CreateUserDto, UserRpDto } from '@/dtos/users.dto'

export interface User {
  id: string
  email: string
  password: string
}

export interface UserService {
  findAllUser(): Promise<UserRpDto[]>
  findUserById(userId: string): Promise<UserRpDto>
  findUserByEmail(email: string): Promise<UserRpDto>
  createUser(userData: CreateUserDto): Promise<UserRpDto>
  updateUser(userId: string, userData: CreateUserDto): Promise<UserRpDto[]>
  deleteUser(userId: string): Promise<UserRpDto[]>
}
