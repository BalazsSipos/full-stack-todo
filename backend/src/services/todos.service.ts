import { CompleteTodoDto, CreateTodoDto, TodoRpDto, UpdateTodoDto } from '../dtos/todos.dto';
import { HttpException } from '../exceptions/HttpException';
import { TYPES } from '../config/types';
import { TodoEntity } from '../entity/todos.entity';
import { TodoRepository } from '../repositories/todos.repository';
import { TodoService } from '../interfaces/todos.interface';
import { UserEntity } from '../entity/users.entity';
import { UserService } from '../interfaces/users.interface';
import { inject, injectable } from 'inversify';
import { isEmpty } from '@automapper/core';
import { mapper } from '../mappings/mapper';
import { validate } from 'class-validator';

@injectable()
export class TodoServiceImpl implements TodoService {
  @inject(TYPES.UserService)
  userService: UserService;

  private todoRepository = TodoRepository;

  public async findAllTodosByUser(userEmail: string, onlyOpenTodos: boolean): Promise<TodoRpDto[]> {
    const todoEntities: TodoEntity[] = onlyOpenTodos
      ? await this.todoRepository.findOpenAndDueTodosByUser(userEmail)
      : await this.todoRepository.findOpenTodosByUser(userEmail);
    const todoRpDtos: TodoRpDto[] = todoEntities.map((todoEntity) => mapper.map(todoEntity, TodoEntity, TodoRpDto));
    return todoRpDtos;
  }

  public async findTodoByUserEmailAndTodoId(email: string, todoId: string): Promise<TodoRpDto> {
    const todoEntity: TodoEntity = await this.todoRepository.findOneBy({ id: todoId });
    if (!todoEntity) throw new HttpException(409, "Todo doesn't exist");
    if (!this.isUserAffectedByTodo(email, todoEntity))
      throw new HttpException(401, "You're not allowed to see this todo");

    return mapper.map(todoEntity, TodoEntity, TodoRpDto);
  }

  public async createTodo(email: string, todoData: CreateTodoDto): Promise<TodoRpDto> {
    const createTodoDto = new CreateTodoDto();
    createTodoDto.populate(todoData);
    await this.validateIncomingTodoData(createTodoDto);

    const userEntity: UserEntity = await this.userService.findUserEntityByEmail(email);
    if (!userEntity) throw new HttpException(409, "User doesn't exist");

    const performedByUserEntity: UserEntity =
      todoData.performedByEmail === email
        ? userEntity
        : await this.userService.findUserEntityByEmail(todoData.performedByEmail);
    if (!performedByUserEntity) throw new HttpException(409, "performedBy user doesn't exist");

    const createTodoEntityData: TodoEntity = {
      ...todoData,
      startingDate: new Date(todoData.startingDate),
      createdBy: userEntity,
      completed: false,
      progress: 0,
      performedBy: performedByUserEntity,
    };

    await this.todoRepository.save(createTodoEntityData);

    return mapper.map(createTodoEntityData, TodoEntity, TodoRpDto);
  }

  private async validateIncomingTodoData(todoData: CreateTodoDto): Promise<void> {
    const result = await validate(todoData);
    const errorList = {};
    if (result.length > 0) {
      result.forEach((error) => {
        errorList[error.property] = Object.values(error.constraints).join(', ');
      });
      throw new HttpException(400, JSON.stringify(errorList));
    }
  }

  public async updateTodo(
    email: string,
    todoId: string,
    todoData: UpdateTodoDto | CompleteTodoDto,
  ): Promise<TodoRpDto> {
    if (Object.prototype.hasOwnProperty.call(todoData, 'completed')) {
      return this.completeTodo(email, todoId, todoData as CompleteTodoDto);
    } else {
      return this.editTodo(email, todoId, todoData as UpdateTodoDto);
    }
  }

  public async deleteTodo(email: string, todoId: string): Promise<TodoRpDto> {
    const todoEntity: TodoEntity = await this.todoRepository.findByTodoId(Number(todoId));
    if (!todoEntity) throw new HttpException(409, "Todo doesn't exist");
    if (todoEntity.createdBy.email !== email) {
      throw new HttpException(401, "You're not allowed to update this todo");
    }
    await this.todoRepository.delete(todoId);
    return mapper.map(todoEntity, TodoEntity, TodoRpDto);
  }

  private isUserAffectedByTodo(email: string, todoEntity: TodoEntity): boolean {
    return todoEntity.createdBy.email === email || todoEntity.performedBy.email === email;
  }

  private async editTodo(email: string, todoId: string, todoData: UpdateTodoDto): Promise<TodoRpDto> {
    const updateTodoDto = new UpdateTodoDto();
    updateTodoDto.populate(todoData);

    await this.validateIncomingTodoData(updateTodoDto);

    const todoEntity: TodoEntity = await this.todoRepository.findByTodoId(Number(todoId));

    this.validateTodoData(email, todoEntity, todoData);

    const performedByUserEntity: UserEntity = await this.userService.findUserEntityByEmail(todoData.performedByEmail);
    if (!performedByUserEntity) throw new HttpException(409, "performedBy user doesn't exist");

    const updateTodoData: TodoEntity = {
      ...todoData,
      startingDate: new Date(todoData.startingDate),
      createdBy: todoEntity.createdBy,
      completed: todoEntity.completed,
      createdAt: todoEntity.createdAt,
      performedBy: performedByUserEntity,
    };

    await this.todoRepository.save(updateTodoData);

    return mapper.map(updateTodoData, TodoEntity, TodoRpDto);
  }

  public async completeTodo(email: string, todoId: string, todoData: CompleteTodoDto): Promise<TodoRpDto> {
    const todoEntity: TodoEntity = await this.todoRepository.findByTodoId(Number(todoId));
    this.validateTodoData(email, todoEntity, todoData);
    const updateTodoData: TodoEntity = {
      ...todoEntity,
      completed: todoData.completed,
    };
    await this.todoRepository.save(updateTodoData);

    return mapper.map(updateTodoData, TodoEntity, TodoRpDto);
  }

  private async validateTodoData(
    email: string,
    todoEntity: TodoEntity,
    todoData: CompleteTodoDto | UpdateTodoDto,
  ): Promise<void> {
    if (isEmpty(todoData)) throw new HttpException(400, 'todoData is empty');
    if (!todoEntity) throw new HttpException(409, "Todo doesn't exist");

    const userEntity: UserEntity = await this.userService.findUserEntityByEmail(email);
    if (!userEntity) throw new HttpException(409, "User doesn't exist");

    if (!this.isUserAffectedByTodo(email, todoEntity)) {
      throw new HttpException(401, "You're not allowed to update this todo");
    }
  }
}
