import { Body, Delete, Get, HttpCode, JsonController, Param, Patch, Post } from 'routing-controllers'
import { CompleteTodoDto, CreateTodoDto, TodoRpDto, UpdateTodoDto } from '../dtos/todos.dto'
import { OpenAPI } from 'routing-controllers-openapi'
import { TYPES } from '../config/types'
import { TodoService } from '../interfaces/todos.interface'
import { inject, injectable } from 'inversify'

@JsonController()
@injectable()
export class TodosController {
  @inject(TYPES.TodoService)
  todoService: TodoService

  @Get('/users/:email/todos')
  @OpenAPI({ summary: 'Return a list of todos of a user' })
  async getTodos(@Param('email') email: string) {
    const findAllTodosData: TodoRpDto[] = await this.todoService.findAllTodosByUser(email)
    return findAllTodosData
  }

  @Get('/users/:email/todos/:tid')
  @OpenAPI({ summary: 'Return find a todo' })
  async getTodoById(@Param('email') email: string, @Param('tid') todoId: string) {
    const findOneTodoData: TodoRpDto = await this.todoService.findTodoByUserEmailAndTodoId(email, todoId)
    return { data: findOneTodoData, message: 'findOne' }
  }

  @Post('/users/:email/todos')
  @HttpCode(201)
  // @UseBefore(validationMiddleware(CreateTodoDto, 'body'))
  // @UseAfter(validationMiddleware(CreateTodoDto, 'body'))
  @OpenAPI({ summary: 'Create a new todo' })
  async createTodo(@Param('email') email: string, @Body() todoData: CreateTodoDto) {
    const createdTodo: TodoRpDto = await this.todoService.createTodo(email, todoData)
    return { data: createdTodo, message: 'created' }
  }

  @Patch('/users/:email/todos/:tid')
  // @UseBefore(validationMiddleware(CreateUserDto, 'body', true))
  @OpenAPI({ summary: 'Update a todo' })
  async updateUser(
    @Param('email') email: string,
    @Param('tid') todoId: string,
    @Body() todoData: UpdateTodoDto | CompleteTodoDto
  ) {
    const updatedTodo: TodoRpDto = await this.todoService.updateTodo(email, todoId, todoData)
    return { data: updatedTodo, message: 'updated' }
  }

  @Delete('/users/:email/todos/:tid')
  @OpenAPI({ summary: 'Delete a todo' })
  async deleteTodo(@Param('email') email: string, @Param('tid') todoId: string) {
    const deletedTodo: TodoRpDto = await this.todoService.deleteTodo(email, todoId)
    return { data: deletedTodo, message: 'deleted' }
  }
}
