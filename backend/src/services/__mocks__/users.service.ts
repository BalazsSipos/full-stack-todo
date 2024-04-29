import { CreateUserDto, UserRpDto } from '../../dtos/users.dto';
import { UserEntity } from '../../entity/users.entity';
import { UserService } from '../../interfaces/users.interface';
import { createUserEntityWithoutTodos, createUserRpDtoWithoutTodos } from '../../tests/entityFactory';
import { injectable } from 'inversify';

@injectable()
export class UserServiceMock implements UserService {
  public async findAllUser(): Promise<UserRpDto[]> {
    return [createUserRpDtoWithoutTodos('1', true)];
  }

  public async findUserByEmail(email: string): Promise<UserRpDto> {
    return createUserRpDtoWithoutTodos(email, true);
  }

  public async findUserEntityByEmail(email: string): Promise<UserEntity> {
    return createUserEntityWithoutTodos(email);
  }

  public async createUser(userData: CreateUserDto): Promise<UserRpDto> {
    return createUserRpDtoWithoutTodos(userData.email, true);
  }
}
