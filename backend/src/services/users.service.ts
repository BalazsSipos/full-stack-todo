import { CreateUserDto, UserRpDto } from 'dtos/users.dto'
import { HttpException } from 'exceptions/HttpException'
import { UserEntity } from 'entity/users.entity'
import { UserRepository } from 'repositories/users.repository'
import { UserService } from 'interfaces/users.interface'
import { injectable } from 'inversify'
import { isEmpty } from 'class-validator'
import { mapper } from 'mappings/mapper'

@injectable()
export class UserServiceImpl implements UserService {
  private userRepository = UserRepository

  public async findAllUser(): Promise<UserRpDto[]> {
    console.log('findAllUser')
    const userEntities: UserEntity[] = await this.userRepository.find({
      relations: {
        createdTodos: true,
      },
      where: {
        createdTodos: {
          completed: false,
        },
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

  public async findUserByEmail(email: string): Promise<UserRpDto> {
    const userEntity: UserEntity = await this.findUserEntityByEmail(email)
    return mapper.map(userEntity, UserEntity, UserRpDto)
  }

  public async findUserEntityByEmail(email: string): Promise<UserEntity> {
    const userEntity: UserEntity = await this.userRepository.findByEmail(email)
    if (!userEntity) throw new HttpException(409, "User doesn't exist")

    return userEntity
  }

  public async createUser(userData: CreateUserDto): Promise<UserRpDto> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty')

    const userEntity: UserEntity = await this.userRepository.findByEmail(userData.email)
    if (userEntity) throw new HttpException(409, `This email ${userData.email} already exists`)

    const newUserEntity: UserEntity = mapper.map(userData, CreateUserDto, UserEntity)
    await this.userRepository.save(newUserEntity)

    return mapper.map(newUserEntity, UserEntity, UserRpDto)
  }
}
