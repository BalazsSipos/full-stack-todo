import { CreateTodoDto, TodoRpDto } from '../dtos/todos.dto';
import { TodoEntity } from '../entity/todos.entity';
import { UserEntity } from '../entity/users.entity';
import { UserRpDto } from '../dtos/users.dto';

export const createUserEntityWithoutTodos = (identifier: string): UserEntity => {
  const userEntity: UserEntity = {
    email: `email${identifier}`,
    name: `name${identifier}`,
    password: `password${identifier}`,
    createdTodos: [],
    performedTodos: [],
  };
  return userEntity;
};

export const createTodoEntity = (identifier: string): TodoEntity => {
  const todoEntity: TodoEntity = {
    id: identifier,
    title: `title${identifier}`,
    description: `description${identifier}`,
    category: `category${identifier}`,
    completed: false,
    location: `location${identifier}`,
    progress: 0,
    startingDate: new Date('2020-01-01T00:00:00.000Z'),
    createdAt: new Date('2020-01-01T00:00:00.000Z'),
    createdBy: createUserEntityWithoutTodos(identifier),
    performedBy: createUserEntityWithoutTodos(identifier),
  };
  return todoEntity;
};

export const createCreateTodoDto = (identifier: string): CreateTodoDto => {
  const createTodoDto = new CreateTodoDto();
  createTodoDto.title = `title${identifier}`;
  createTodoDto.description = `description${identifier}`;
  createTodoDto.category = `category${identifier}`;
  createTodoDto.location = `location${identifier}`;
  createTodoDto.startingDate = '2020-01-01T00:00:00.000Z';
  createTodoDto.performedByEmail = `email@${identifier}.com`;

  return createTodoDto;
};

export const createTodoRpDto = (identifier: string, email?: string): TodoRpDto => {
  const todoEntityRpDto: TodoRpDto = {
    id: identifier,
    title: `title${identifier}`,
    description: `description${identifier}`,
    category: `category${identifier}`,
    completed: false,
    location: `location${identifier}`,
    progress: 0,
    startingDate: '2020-01-01T00:00:00.000Z',
    createdAt: '2020-01-01T00:00:00.000Z',
    createdBy: createUserRpDtoWithoutTodos(identifier, false),
    performedBy: createUserRpDtoWithoutTodos(email ?? identifier, false),
  };
  return todoEntityRpDto;
};

export const createUserRpDtoWithoutTodos = (identifier: string, showNumberOfTodos): UserRpDto => {
  const userRpDto = new UserRpDto();
  userRpDto.email = `email${identifier}`;
  userRpDto.name = `name${identifier}`;
  userRpDto.numberOfTodos = showNumberOfTodos ? 0 : undefined;
  userRpDto.image = undefined;
  return userRpDto;
};
