import { Body, Delete, Get, HttpCode, JsonController, Param, Patch, Post, UseAfter } from 'routing-controllers';
import { CreateTodoDto, UpdateTodoDto } from '@/dtos/todos.dto';
import { OpenAPI } from 'routing-controllers-openapi';
import { TYPES } from '@/config/types';
import { Todo, TodoService } from '@/interfaces/todos.interface';
import { inject, injectable } from 'inversify';
import { validationMiddleware } from '@middlewares/validation.middleware';

@JsonController()
@injectable()
export class TodosController {
  @inject(TYPES.TodoService)
  todoService: TodoService;

  @Get('/users/:uid/todos')
  @OpenAPI({ summary: 'Return a list of todos of a user' })
  async getTodos(@Param('uid') userId: string) {
    const findAllTodosData: Todo[] = await this.todoService.findAllTodosByUser(userId);
    return findAllTodosData;
  }

  @Get('/users/:uid/todos/:tid')
  @OpenAPI({ summary: 'Return find a todo' })
  async getTodoById(@Param('uid') userId: string, @Param('tid') todoId: string) {
    const findOneTodoData: Todo = await this.todoService.findTodoById(userId, todoId);
    return { data: findOneTodoData, message: 'findOne' };
  }

  @Post('/users/:uid/todos')
  @HttpCode(201)
  // @UseBefore(validationMiddleware(CreateUserDto, 'body'))
  @UseAfter(validationMiddleware(CreateTodoDto, 'body'))
  @OpenAPI({ summary: 'Create a new todo' })
  async createTodo(@Param('uid') userId: string, @Body() todoData: CreateTodoDto) {
    const createdTodo: Todo = await this.todoService.createTodo(userId, todoData, );
    return { data: createdTodo, message: 'created' };
  }

  @Patch('/users/:uid/todos/:tid')
  // @UseBefore(validationMiddleware(CreateUserDto, 'body', true))
  @OpenAPI({ summary: 'Update a todo' })
  async updateUser(@Param('uid') userId: string,  @Param('tid') todoId: string, @Body() todoData: UpdateTodoDto) {
    const updatedTodo: Todo[] = await this.todoService.updateTodo(userId, todoId, todoData);
    return { data: updatedTodo, message: 'updated' };
  }

  @Delete('/users/:uid/todos/:tid')
  @OpenAPI({ summary: 'Delete a todo' })
  async deleteTodo(@Param('uid') userId: string,  @Param('tid') todoId: string) {
    const deletedTodo: Todo[] = await this.todoService.deleteTodo(userId, todoId);
    return { data: deletedTodo, message: 'deleted' };
  }
}
