import { CompleteTodoDto, CreateTodoDto, TodoRpDto, UpdateTodoDto } from '../../dtos/todos.dto';
import { TodoService } from '../../interfaces/todos.interface';
import { createTodoRpDto } from '../entityFactory';
import { injectable } from 'inversify';

@injectable()
export class TodoServiceMock implements TodoService {
  public async findAllTodosByUser(userEmail: string): Promise<TodoRpDto[]> {
    return [createTodoRpDto('1')];
  }

  public async findTodoByUserEmailAndTodoId(userId: string, todoId: string): Promise<TodoRpDto> {
    return createTodoRpDto(todoId);
  }

  public async createTodo(email: string, todoData: CreateTodoDto): Promise<TodoRpDto> {
    return createTodoRpDto('1');
  }

  public async updateTodo(
    email: string,
    todoId: string,
    todoData: UpdateTodoDto | CompleteTodoDto,
  ): Promise<TodoRpDto> {
    return createTodoRpDto(todoId);
  }

  public async deleteTodo(email: string, todoId: string): Promise<TodoRpDto> {
    return createTodoRpDto(todoId);
  }
}
