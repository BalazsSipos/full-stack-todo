import { IsDefined, IsEmail, IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';
import { User } from './User';

export const todoStatuses = ['Open', 'Done', 'Obsolete'] as const;
export type TodoStatus = typeof todoStatuses[number];

export class Todo {
  id?: number;
  @IsString()
  @IsNotEmpty()
  title?: string;
  description?: string;
  category?: string;
  completed?: boolean;
  location?: string;
  @IsInt()
  @Min(0)
  @Max(100)
  progress?: number;
  @IsDefined()
  startingDate?: string;
  createdAt?: string;
  createdBy?: User;
  createdByEmail?: string;
  performedBy?: User;
  @IsEmail()
  performedByEmail?: string;

  prepareToBackend(todo: Todo): Todo {
    if (!todo) {
      return new Todo();
    }
    const preparedTodo: Todo = new Todo();

    if (todo.id) {
      preparedTodo.id = todo.id;
    }

    if (todo.title?.trim() !== '') {
      preparedTodo.title = todo.title;
    }
    if (todo.description?.trim() !== '') {
      preparedTodo.description = todo.description;
    }
    if (todo.category?.trim() !== '') {
      preparedTodo.category = todo.category;
    }
    if (todo.location?.trim() !== '') {
      preparedTodo.location = todo.location;
    }
    if (todo.startingDate?.trim() !== '') {
      preparedTodo.startingDate = todo.startingDate;
    }
    if (todo.performedByEmail?.trim() !== '') {
      preparedTodo.performedByEmail = todo.performedByEmail;
    }
    if (todo.createdAt?.trim() !== '') {
      preparedTodo.createdAt = todo.createdAt;
    }
    if (todo.progress && todo.progress != 0) {
      preparedTodo.progress = +todo.progress;
    }

    return preparedTodo;
  }
}
