import 'reflect-metadata';
import { Container } from 'inversify';
import { CreateTodoDto } from '../../dtos/todos.dto';
import { TYPES } from '../../config/types';
import { TodoRepository } from '../../repositories/todos.repository';
import { TodoService } from '../../interfaces/todos.interface';
import { TodoServiceImpl } from '../../services/todos.service';
import { UserService } from '../../interfaces/users.interface';
import { UserServiceMock } from '../../services/__mocks__/users.service';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { createCreateTodoDto, createTodoEntity, createTodoRpDto } from '../entityFactory';

let container = new Container();

beforeEach(() => {
  container = new Container();
  container.bind<TodoService>(TYPES.TodoService).to(TodoServiceImpl);
  container.bind<UserService>(TYPES.UserService).to(UserServiceMock);

  TodoRepository.findOpenTodosByUser = jest.fn((email: string) => [createTodoEntity(email)]);
  TodoRepository.save = jest.fn((todoEntity: any) => {
    todoEntity.id = '1';
    todoEntity.createdAt = new Date('2020-01-01T00:00:00.000Z');
    return Promise.resolve(todoEntity);
  });
});

describe('findAllTodosByUser()', () => {
  it('Should return the converted TodoRpDto list', async () => {
    const todoService: TodoService = container.get(TYPES.TodoService);

    const todos = await todoService.findAllTodosByUser('1');
    expect(todos).toEqual([createTodoRpDto('1')]);
  });
});

describe('createTodo()', () => {
  it('Should give an error if todo creation data is empty during todo creation', async () => {
    const todoService: TodoService = container.get(TYPES.TodoService);

    try {
      await todoService.createTodo('1', new CreateTodoDto());
    } catch (error) {
      expect(error).toMatchObject({ status: 400 });
      expect(error.message).toMatch(/title should not be empty/);
    }
  });

  it('Should give back the transformed TodoRpDto after todo creation', async () => {
    const todoService: TodoService = container.get(TYPES.TodoService);

    const createdTodoRpDto = await todoService.createTodo('1', createCreateTodoDto('1'));
    expect(createdTodoRpDto).toEqual(createTodoRpDto('1', 'email@1.com'));
  });
});
