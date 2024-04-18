import { TodoEntity } from '../entity/todos.entity';
import { TodoRpDto } from '../dtos/todos.dto';
import { UserEntity } from '../entity/users.entity';
import { UserRpDto } from '../dtos/users.dto';

export const createUserEntityWithoutTodos = (identifier: number): UserEntity => {
  const userEntity: UserEntity = {
    email: `email${identifier}`,
    name: `name${identifier}`,
    password: `password${identifier}`,
    createdTodos: [],
    performedTodos: [],
  };
  return userEntity;
};

export const createTodoEntity = (identifier: number): TodoEntity => {
  const todoEntity: TodoEntity = {
    id: identifier,
    title: `title${identifier}`,
    description: `description${identifier}`,
    category: `category${identifier}`,
    completed: false,
    location: `location${identifier}`,
    progress: identifier,
    startingDate: new Date(),
    createdAt: new Date(),
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
    progress: +identifier,
    startingDate: '2020/01/01',
    createdAt: '2020/01/01',
    createdBy: createUserRpDtoWithoutTodos(identifier),
    performedBy: createUserRpDtoWithoutTodos(identifier),
  };
  return todoEntityRpDto;
};

export const createUserRpDtoWithoutTodos = (identifier: string): UserRpDto => {
  const userRpDto: UserRpDto = {
    email: `email${identifier}`,
    name: `name${identifier}`,
    numberOfTodos: 0,
  };
  return userRpDto;
};
