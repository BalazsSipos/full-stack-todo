import { CreateTodoDto, TodoRpDto, UpdateTodoDto } from '@/dtos/todos.dto'
import { HttpException } from '@exceptions/HttpException'
import { Repository } from 'typeorm'
import { TYPES } from '@/config/types'
import { Todo, TodoService } from '@/interfaces/todos.interface'
import { TodoEntity } from '@/entity/todos.entity'
import { TodoRepository } from '@/repositories/todos.repository'
import { UserRpDto } from '@/dtos/users.dto'
import { UserService } from '@interfaces/users.interface'
import { inject, injectable } from 'inversify'
import { isEmpty } from '@utils/util'
import { mapper } from '@/mappings/mapper'
import { todoModel } from '@/models/todos.model'

@injectable()
export class TodoServiceImpl implements TodoService {
  public todos = todoModel

  @inject(TYPES.UserService)
  userService: UserService

  private todoRepository: Repository<TodoEntity> = TodoRepository

  public async findAllTodosByUser(userId: string): Promise<TodoRpDto[]> {
    // const todos: Todo[] = this.todos.filter((todo) => todo.createdBy === userId || todo.performedBy === userId)
    const todoEntities: TodoEntity[] = await this.todoRepository
      .createQueryBuilder('todo')
      .where('todo.createdBy.id = :creatorId', { creatorId: userId })
      .orWhere('todo.performedBy.id = :performerId', { performerId: userId })
      .getMany()
    // .find({
    //   where: [{ createdBy.id: userId }, { performedBy: userId }],
    // })
    // .filter((todo) => todo.createdBy === userId || todo.performedBy === userId)
    const todoRpDtos: TodoRpDto[] = todoEntities.map((todoEntity) => mapper.map(todoEntity, TodoEntity, TodoRpDto))
    return todoRpDtos
  }

  public async findTodoById(userId: string, todoId: string): Promise<Todo> {
    const findTodo: Todo = this.todos.find((todo) => todo.id === todoId)
    if (!findTodo) throw new HttpException(409, "Todo doesn't exist")
    if (!this.isUserAffectedByTodo(userId, findTodo))
      throw new HttpException(401, "You're not allowed to see this todo")

    return findTodo
  }

  public async createTodo(userId: string, todoData: CreateTodoDto): Promise<Todo> {
    if (isEmpty(todoData)) throw new HttpException(400, 'todoData is empty')

    const findUser: UserRpDto = await this.userService.findUserById(userId)
    if (!findUser) throw new HttpException(409, "User doesn't exist")

    const performedByUser: UserRpDto =
      todoData.performedBy === userId ? findUser : await this.userService.findUserById(todoData.performedBy)
    if (!performedByUser) throw new HttpException(409, "performedBy user doesn't exist")

    const createTodoData: Todo = {
      id: String(this.todos.length + 1),
      ...todoData,
      createdBy: userId,
      completed: false,
      progress: 0,
      createdAt: String(new Date()),
      performedBy: todoData.performedBy,
    }
    this.todos = [...this.todos, createTodoData]

    return createTodoData
  }

  public async updateTodo(userId: string, todoId: string, todoData: UpdateTodoDto): Promise<Todo[]> {
    if (isEmpty(todoData)) throw new HttpException(400, 'todoData is empty')

    const findTodo: Todo = this.todos.find((todo) => todo.id === todoId)
    if (!findTodo) throw new HttpException(409, "Todo doesn't exist")
    if (!this.isUserAffectedByTodo(userId, findTodo)) {
      throw new HttpException(401, "You're not allowed to update this todo")
    }
    const performedByUser: UserRpDto = await this.userService.findUserById(todoData.performedBy)
    if (!performedByUser) throw new HttpException(409, "performedBy user doesn't exist")

    const updateTodoData: Todo[] = this.todos.map((todo: Todo) => {
      if (todo.id === findTodo.id) {
        todo = {
          id: todoId,
          ...todoData,
          createdBy: findTodo.createdBy,
          completed: false,
          createdAt: findTodo.createdAt,
          performedBy: todoData.performedBy,
        }
      }
      return todo
    })
    this.todos = updateTodoData

    return updateTodoData
  }

  public async deleteTodo(userId: string, todoId: string): Promise<Todo[]> {
    const findTodo: Todo = this.todos.find((todo) => todo.id === todoId)
    if (!findTodo) {
      throw new HttpException(409, "Todo doesn't exist")
    }
    if (!this.isUserAffectedByTodo(userId, findTodo)) {
      throw new HttpException(401, "You're not allowed to delete this todo")
    }
    const deleteTodoData: Todo[] = this.todos.filter((todo) => todo.id !== findTodo.id)
    this.todos = deleteTodoData
    return deleteTodoData
  }

  private isUserAffectedByTodo(userId: string, todo: Todo): boolean {
    return todo.createdBy === userId || todo.performedBy === userId
  }
}
