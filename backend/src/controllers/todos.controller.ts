import * as express from 'express';
import { TYPES } from '../config/types';
import { TodoRpDto } from '../dtos/todos.dto';
import { TodoService } from '../interfaces/todos.interface';
import {
  controller,
  httpDelete,
  httpGet,
  httpPatch,
  httpPost,
  queryParam,
  request,
  requestParam,
  response,
} from 'inversify-express-utils';
import { inject } from 'inversify';

@controller('/todos')
export class TodosController {
  // @inject(TYPES.TodoService)
  // todoService: TodoService;
  constructor(@inject(TYPES.TodoService) private todoService: TodoService) {}

  @httpGet('/')
  // @UseBefore(authenticateJWT, authorizeOwnUserRequest)
  async getTodos(@queryParam('email') email: string, @request() req: express.Request) {
    console.log('email', email);
    console.log('req', req.url);
    const findAllTodosData: TodoRpDto[] = await this.todoService.findAllTodosByUser(email);
    return findAllTodosData;
  }

  @httpGet('/:tid')
  async getTodoById(@queryParam('email') email: string, @requestParam('tid') todoId: string) {
    const findOneTodoData: TodoRpDto = await this.todoService.findTodoByUserEmailAndTodoId(email, todoId);
    return { data: findOneTodoData, message: 'findOne' };
  }

  @httpPost('/')
  // @UseBefore(validationMiddleware(CreateTodoDto, 'body'))
  // @UseAfter(validationMiddleware(CreateTodoDto, 'body'))
  async createTodo(
    @queryParam('email') email: string,
    @request() req: express.Request,
    @response() res: express.Response
  ) {
    const createdTodo: TodoRpDto = await this.todoService.createTodo(email, req.body);
    res.status(201).json({ data: createdTodo, message: 'created' });
  }

  @httpPatch('/:tid')
  // @UseBefore(validationMiddleware(CreateUserDto, 'body', true))
  async updateUser(
    @queryParam('email') email: string,
    @requestParam('tid') todoId: string,
    @request() req: express.Request,
    @response() res: express.Response
  ) {
    const updatedTodo: TodoRpDto = await this.todoService.updateTodo(email, todoId, req.body);
    res.status(200).json({ data: updatedTodo, message: 'updated' });
  }

  @httpDelete('/:tid')
  async deleteTodo(@queryParam('email') email: string, @requestParam('tid') todoId: string) {
    const deletedTodo: TodoRpDto = await this.todoService.deleteTodo(email, todoId);
    return { data: deletedTodo, message: 'deleted' };
  }
}
