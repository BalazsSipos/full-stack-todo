import { Container } from 'inversify';
import { TYPES } from './types';
import { TodoService } from '../interfaces/todos.interface';
import { TodoServiceImpl } from '../services/todos.service';
import { UserService } from '../interfaces/users.interface';
import { UserServiceImpl } from '../services/users.service';

export const myContainer = new Container();
myContainer.bind<UserService>(TYPES.UserService).to(UserServiceImpl);
myContainer.bind<TodoService>(TYPES.TodoService).to(TodoServiceImpl);
