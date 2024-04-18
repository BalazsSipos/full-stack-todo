// import 'reflect-metadata'
import 'reflect-metadata';
import { Container } from 'inversify';
import { TYPES } from '../../config/types';
import { TodoController, TodoService } from '../../interfaces/todos.interface';
import { TodoControllerImpl } from '../../controllers/todos.controller';
import { TodoServiceTest } from '../implementations/TodoServiceTest';
import { beforeEach, expect, it } from '@jest/globals';
import { createTodoRpDto } from '../entityFactory';
import httpMocks from 'node-mocks-http';

let container = new Container();

beforeEach(() => {
  container = new Container();
  container.bind<TodoController>(TYPES.TodoController).to(TodoControllerImpl);
  container.bind<TodoService>(TYPES.TodoService).to(TodoServiceTest);
});

it('Should return a todo', () => {
  const mockExpressRequest = httpMocks.createRequest({
    method: 'GET',
    url: '/todos',
    email: 'email',
  });
  const mockExpressResponse = httpMocks.createResponse();

  const todoController: TodoController = container.get(TYPES.TodoController);
  todoController.getTodos(mockExpressRequest, mockExpressResponse).then(
    () => {
      const resData = mockExpressResponse._getJSONData();
      expect(resData).toEqual([createTodoRpDto('1')]);
      expect(mockExpressResponse.statusCode).toBe(200);
    },
    (error) => {
      console.log('error', error);
      throw new Error('error');
    }
  );
});
