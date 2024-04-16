import { Container } from 'inversify';
import { TYPES } from './types';
import { TodoService } from '../interfaces/todos.interface';
import { TodoServiceImpl } from '../services/todos.service';
import { TodosController } from '../controllers/todos.controller';
import { UserControllerImpl } from '../controllers/users.controller';
import { UserService, UserController } from '../interfaces/users.interface';
import { UserServiceImpl } from '../services/users.service';

export const myContainer = new Container();
myContainer.bind<UserService>(TYPES.UserService).to(UserServiceImpl);
myContainer.bind<TodoService>(TYPES.TodoService).to(TodoServiceImpl);
myContainer.bind<UserController>(TYPES.UserController).to(UserControllerImpl);
myContainer.bind<TodosController>(TodosController).toSelf().inSingletonScope();
