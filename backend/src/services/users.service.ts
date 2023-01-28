import { CreateUserDto, UserRpDto } from '@dtos/users.dto'
import { HttpException } from '@exceptions/HttpException'
import { Repository } from 'typeorm'
import { UserEntity } from '@/entity/users.entity'
import { UserRepository } from '../repositories/users.repository'
import { UserService } from '@interfaces/users.interface'
import { injectable } from 'inversify'
import { isEmpty } from '@utils/util'
import { mapper } from '@/mappings/mapper'
import { userModel } from '@models/users.model'

@injectable()
export class UserServiceImpl implements UserService {
  public users = userModel

  private userRepository: Repository<UserEntity> = UserRepository

  public async findAllUser(): Promise<UserRpDto[]> {
    console.log('findAllUser')
    const userEntities: UserEntity[] = await this.userRepository.find({
      relations: {
        createdTodos: true,
      },
    })
    console.log('userEntities', userEntities)
    const userRpDtos: UserRpDto[] = userEntities.map((userEntity) => {
      const userRpDto: UserRpDto = mapper.map(userEntity, UserEntity, UserRpDto)
      userRpDto.numberOfTodos = userEntity.createdTodos.length
      return userRpDto
    })
    return userRpDtos
  }

  public async findUserById(userId: string): Promise<UserRpDto> {
    const findUser: UserRpDto = this.users.find((user) => user.id === userId)
    if (!findUser) throw new HttpException(409, "User doesn't exist")

    return findUser
  }

  public async createUser(userData: CreateUserDto): Promise<UserRpDto> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty')

    const findUser: UserRpDto = this.users.find((user) => user.email === userData.email)
    if (findUser) throw new HttpException(409, `This email ${userData.email} already exists`)

    const createUserData: UserRpDto = { id: String(this.users.length + 1), ...userData, numberOfTodos: 0 }
    this.users = [...this.users, createUserData]

    return createUserData
  }

  public async updateUser(userId: string, userData: CreateUserDto): Promise<UserRpDto[]> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty')

    const findUser: UserRpDto = this.users.find((user) => user.id === userId)
    if (!findUser) throw new HttpException(409, "User doesn't exist")

    const updateUserData: UserRpDto[] = this.users.map((user: UserRpDto) => {
      if (user.id === findUser.id) {
        user = { id: userId, ...userData, numberOfTodos: findUser.numberOfTodos }
      }
      return user
    })
    this.users = updateUserData

    return updateUserData
  }

  public async deleteUser(userId: string): Promise<UserRpDto[]> {
    const findUser: UserRpDto = this.users.find((user) => user.id === userId)
    if (!findUser) throw new HttpException(409, "User doesn't exist")

    const deleteUserData: UserRpDto[] = this.users.filter((user) => user.id !== findUser.id)
    this.users = deleteUserData
    return deleteUserData
  }
}
