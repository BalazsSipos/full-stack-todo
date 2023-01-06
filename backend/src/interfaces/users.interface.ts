import { CreateUserDto } from "@/dtos/users.dto"

export interface User {
  id: string
  email: string
  password: string
}

export interface UserService {
    findAllUser(): Promise<User[]>
    findUserById(userId: string): Promise<User>
    createUser(userData: CreateUserDto): Promise<User>
    updateUser(userId: string, userData: CreateUserDto): Promise<User[]>
    deleteUser(userId: string): Promise<User[]>
 }
