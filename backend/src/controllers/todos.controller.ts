import { Request, Response } from 'express';
import { TYPES } from '../config/types';
import { TodoController, TodoService } from '../interfaces/todos.interface';
import { TodoRpDto } from '../dtos/todos.dto';

import { inject, injectable } from 'inversify';

@injectable()
export class TodoControllerImpl implements TodoController {
  // @inject(TYPES.TodoService)
  // todoService: TodoService;
  constructor(@inject(TYPES.TodoService) private todoService: TodoService) {}

  // @UseBefore(authenticateJWT, authorizeOwnUserRequest)
  getTodos = async (req: Request, res: Response): Promise<Response<TodoRpDto[]>> => {
    const email = res.locals.email;
    if (!email) {
      throw new Error('email is required');
      // return res.status(400).json({ error: 'email is required' });
    }
    const findAllTodosData: TodoRpDto[] = await this.todoService.findAllTodosByUser(email);
    const data = res.status(200).json(findAllTodosData);
    return data;
  };

  getTodoById = async (req: Request, res: Response): Promise<Response<TodoRpDto>> => {
    const email = res.locals.email as string;
    if (!email) {
      return res.status(400).json({ error: 'email is required' });
    }
    const todoId = req.params.tid;
    const findOneTodoData: TodoRpDto = await this.todoService.findTodoByUserEmailAndTodoId(email, todoId);
    const data = res.status(200).json(findOneTodoData);
    return data;
  };

  // @UseBefore(validationMiddleware(CreateTodoDto, 'body'))
  // @UseAfter(validationMiddleware(CreateTodoDto, 'body'))
  createTodo = async (req: Request, res: Response): Promise<Response<TodoRpDto>> => {
    const email = res.locals.email;
    const createdTodo: TodoRpDto = await this.todoService.createTodo(email, req.body);
    return res.status(201).json(createdTodo);
  };

  // @UseBefore(validationMiddleware(CreateUserDto, 'body', true))
  updateTodo = async (req: Request, res: Response): Promise<Response<TodoRpDto>> => {
    const email = res.locals.email;
    const todoId = req.params.tid;
    const updatedTodo: TodoRpDto = await this.todoService.updateTodo(email, todoId, req.body);
    return res.status(200).json({ data: updatedTodo, message: 'updated' });
  };

  deleteTodo = async (req: Request, res: Response): Promise<Response<TodoRpDto>> => {
    const email = res.locals.email;
    const todoId = req.params.tid;

    const deletedTodo: TodoRpDto = await this.todoService.deleteTodo(email, todoId);
    return res.status(200).json(deletedTodo);
  };
}
