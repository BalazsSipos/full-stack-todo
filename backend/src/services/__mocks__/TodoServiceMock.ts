import { TodoRpDto } from '../../dtos/todos.dto';
import { TodoService } from '../../interfaces/todos.interface';
import { createTodoRpDto } from '../../tests/entityFactory';
import { injectable } from 'inversify';

@injectable()
export class TodoServiceMock implements TodoService {
  public async findAllTodosByUser(userEmail: string): Promise<TodoRpDto[]> {
    const newLocal = [createTodoRpDto(userEmail)];
    return newLocal;
  }

  public async findTodoByUserEmailAndTodoId(userId: string, todoId: string): Promise<TodoRpDto> {
    return createTodoRpDto(todoId);
  }

  public async createTodo(email: string): Promise<TodoRpDto> {
    return createTodoRpDto(email);
  }

  public async updateTodo(email: string, todoId: string): Promise<TodoRpDto> {
    return createTodoRpDto(todoId);
  }

  public async deleteTodo(email: string, todoId: string): Promise<TodoRpDto> {
    return createTodoRpDto(todoId);
  }
}
