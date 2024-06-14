import { CompleteTodoDto, CreateTodoDto, TodoRpDto, UpdateTodoDto } from '../dtos/todos.dto';
import { NextFunction, Request, Response } from 'express';

export interface Todo {
  id: string;
  title: string;
  description?: string;
  category?: string;
  completed: boolean;
  location?: string;
  progress?: number;
  startingDate: string;
  createdAt: string;
  createdBy: string;
  performedBy: string;
}

export interface TodoService {
  findAllTodosByUser(email: string, onlyOpenTodos: boolean): Promise<TodoRpDto[]>;
  findTodoByUserEmailAndTodoId(userId: string, todoId: string): Promise<TodoRpDto>;
  createTodo(email: string, todoData: CreateTodoDto): Promise<TodoRpDto>;
  updateTodo(email: string, todoId: string, todoData: UpdateTodoDto | CompleteTodoDto): Promise<TodoRpDto>;
  deleteTodo(email: string, todoId: string): Promise<TodoRpDto>;
}

export interface TodoController {
  getTodos(req: Request, res: Response): Promise<Response<TodoRpDto[]>>;
  getTodoById(req: Request, res: Response): Promise<Response<TodoRpDto>>;
  createTodo(req: Request, res: Response, next: NextFunction): Promise<Response<TodoRpDto>>;
  updateTodo(req: Request, res: Response, next: NextFunction): Promise<Response<TodoRpDto>>;
  deleteTodo(req: Request, res: Response): Promise<Response<TodoRpDto>>;
}
