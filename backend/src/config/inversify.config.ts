import { Container } from 'inversify';
import { TYPES } from './types';
import { TodoController, TodoService } from '../interfaces/todos.interface';
import { TodoControllerImpl } from '../controllers/todos.controller';
import { TodoServiceImpl } from '../services/todos.service';
import { UserController, UserService } from '../interfaces/users.interface';
import { UserControllerImpl } from '../controllers/users.controller';
import { UserServiceImpl } from '../services/users.service';

export const myContainer = new Container();
myContainer.bind<UserService>(TYPES.UserService).to(UserServiceImpl);
myContainer.bind<TodoService>(TYPES.TodoService).to(TodoServiceImpl);
myContainer.bind<UserController>(TYPES.UserController).to(UserControllerImpl);
myContainer.bind<TodoController>(TYPES.TodoController).to(TodoControllerImpl);
