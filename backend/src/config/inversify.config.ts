import { Container } from "inversify";
import { TYPES } from "./types";
import { TodoService } from "@/interfaces/todos.interface";
import { TodoServiceImpl } from "@/services/todos.service";
import { TodosController } from "@/controllers/todos.controller";
import { UserService } from "@/interfaces/users.interface";
import { UserServiceImpl } from "@/services/users.service";
import { UsersController } from "@/controllers/users.controller";

// eslint-disable-next-line @typescript-eslint/ban-types
export const Controllers: Function[] = [UsersController, TodosController];

export const myContainer = new Container();
myContainer.bind<UserService>(TYPES.UserService).to(UserServiceImpl);
myContainer.bind<TodoService>(TYPES.TodoService).to(TodoServiceImpl);
myContainer.bind<UsersController>(UsersController).toSelf().inSingletonScope()
myContainer.bind<TodosController>(TodosController).toSelf().inSingletonScope()
