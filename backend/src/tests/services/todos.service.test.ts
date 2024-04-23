// import 'reflect-metadata'
import 'reflect-metadata';
import { Container } from 'inversify';
import { TYPES } from '../../config/types';
import { TodoRepository } from '../../repositories/todos.repository';
import { TodoService } from '../../interfaces/todos.interface';
import { TodoServiceImpl } from '../../services/todos.service';
import { UserService } from '../../interfaces/users.interface';
import { UserServiceMock } from '../../services/__mocks__/users.service';
import { beforeEach, expect, it, jest } from '@jest/globals';
import { createTodoEntity, createTodoRpDto } from '../entityFactory';

let container = new Container();

beforeEach(() => {
  container = new Container();
  container.bind<TodoService>(TYPES.TodoService).to(TodoServiceImpl);
  container.bind<UserService>(TYPES.UserService).to(UserServiceMock);

  TodoRepository.findOpenTodosByUser = jest.fn((email: string) => [createTodoEntity(email)]);
});

it('Should return the converted TodoRpDto list', () => {
  const todoService: TodoService = container.get(TYPES.TodoService);

  todoService.findAllTodosByUser('1').then(
    (resData) => {
      expect(resData).toEqual([createTodoRpDto('1')]);
    },
    (error) => {
      console.log('error', error);
      throw new Error('error');
    },
  );
});
