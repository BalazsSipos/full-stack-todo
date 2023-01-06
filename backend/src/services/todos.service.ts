import { CreateTodoDto, UpdateTodoDto } from '@/dtos/todos.dto'
import { HttpException } from '@exceptions/HttpException'
import { TYPES } from '@/config/types'
import { Todo, TodoService } from '@/interfaces/todos.interface'
import { User, UserService } from '@interfaces/users.interface'
import { inject, injectable } from 'inversify'
import { isEmpty } from '@utils/util'
import { todoModel } from '@/models/todos.model'

@injectable()
export class TodoServiceImpl implements TodoService {
  public todos = todoModel

  @inject(TYPES.UserService)
  userService: UserService

  public async findAllTodosByUser(userId: string): Promise<Todo[]> {
    const todos: Todo[] = this.todos.filter((todo) => todo.createdBy.id === userId || todo.performedBy.id === userId)
    return todos
  }

  public async findTodoById(userId: string, todoId: string): Promise<Todo> {
    const findTodo: Todo = this.todos.find((todo) => todo.id === todoId)
    if (!findTodo) throw new HttpException(409, "Todo doesn't exist")
    if (!this.isUserAffectedByTodo(userId, findTodo)) throw new HttpException(401, "You're not allowed to see this todo")

    return findTodo
  }

  public async createTodo(userId: string, todoData: CreateTodoDto): Promise<Todo> {
    if (isEmpty(todoData)) throw new HttpException(400, 'todoData is empty')

    const findUser: User = await this.userService.findUserById(userId)

    const performedByUser: User =
      todoData.performedBy === userId ? findUser : await this.userService.findUserById(todoData.performedBy)

    const createTodoData: Todo = {
      id: String(this.todos.length + 1),
      ...todoData,
      createdBy: findUser,
      completed: false,
      progress: 0,
      createdAt: String(new Date()),
      performedBy: performedByUser,
    }
    this.todos = [...this.todos, createTodoData]

    return createTodoData
  }

  public async updateTodo(userId: string, todoId: string, todoData: UpdateTodoDto): Promise<Todo[]> {
    if (isEmpty(todoData)) throw new HttpException(400, 'todoData is empty')

    const findTodo: Todo = this.todos.find((todo) => todo.id === todoId)
    if (!findTodo) throw new HttpException(409, "Todo doesn't exist")
    if (!this.isUserAffectedByTodo(userId, findTodo)) throw new HttpException(401, "You're not allowed to update this todo")
    const findUser: User = await this.userService.findUserById(userId)
    const performedByUser: User =
      todoData.performedBy === userId ? findUser : await this.userService.findUserById(todoData.performedBy)

    const updateTodoData: Todo[] = this.todos.map((todo: Todo) => {
      if (todo.id === findTodo.id) {
        todo = {
          id: todoId,
          ...todoData,
          createdBy: findUser,
          completed: false,
          createdAt: findTodo.createdAt,
          performedBy: performedByUser,
        }
      }
      return todo
    })
    this.todos = updateTodoData

    return updateTodoData
  }

  public async deleteTodo(userId: string, todoId: string): Promise<Todo[]> {
    const findTodo: Todo = this.todos.find((todo) => todo.id === todoId)
    if (!findTodo) throw new HttpException(409, "User doesn't exist")
    if (!this.isUserAffectedByTodo(userId, findTodo)) throw new HttpException(401, "You're not allowed to delete this todo")

    const deleteTodoData: Todo[] = this.todos.filter((todo) => todo.id !== findTodo.id)
    this.todos = deleteTodoData
    return deleteTodoData
  }

  private isUserAffectedByTodo(userId: string, todo: Todo): boolean {
    return todo.createdBy.id === userId || todo.performedBy.id === userId;
  }
}
