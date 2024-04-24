import { TodoEntity } from '../entity/todos.entity';
import { TodoRpDto } from '../dtos/todos.dto';
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
    id: parseInt(identifier),
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

export const createTodoRpDto = (identifier: string): TodoRpDto => {
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
    performedBy: createUserRpDtoWithoutTodos(identifier, false),
  };
  return todoEntityRpDto;
};

export const createUserRpDtoWithoutTodos = (identifier: string, showNumberOfTodos): UserRpDto => {
  const userRpDto: UserRpDto = {
    email: `email${identifier}`,
    name: `name${identifier}`,
    numberOfTodos: showNumberOfTodos ? 0 : undefined,
    image: undefined,
  };
  return userRpDto;
};
