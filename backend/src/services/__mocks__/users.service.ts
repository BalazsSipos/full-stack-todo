import { injectable } from 'inversify';
import { createUserRpDtoWithoutTodos, createUserEntityWithoutTodos } from '../../tests/entityFactory';
import { UserService } from '../../interfaces/users.interface';
import { CreateUserDto, UserRpDto } from '../../dtos/users.dto';
import { UserEntity } from '../../entity/users.entity';

@injectable()
export class UserServiceMock implements UserService {
  public async findAllUser(): Promise<UserRpDto[]> {
    return [createUserRpDtoWithoutTodos('1', true)];
  }

  public async findUserByEmail(email: string): Promise<UserRpDto> {
    const userEntity: UserEntity = await this.findUserEntityByEmail(email);
    return createUserRpDtoWithoutTodos('1', true);
  }

  public async findUserEntityByEmail(email: string): Promise<UserEntity> {
    return createUserEntityWithoutTodos(1);
  }

  public async createUser(userData: CreateUserDto): Promise<UserRpDto> {
    return createUserRpDtoWithoutTodos('1', true);
  }
}
