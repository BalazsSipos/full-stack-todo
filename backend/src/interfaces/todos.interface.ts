import { CompleteTodoDto, CreateTodoDto, TodoRpDto, UpdateTodoDto } from '@/dtos/todos.dto'

export interface Todo {
  id: string
  title: string
  description?: string
  category?: string
  completed: boolean
  location?: string
  progress?: number
  startingDate: string
  createdAt: string
  createdBy: string
  performedBy: string
}

export interface TodoService {
  findAllTodosByUser(email: string): Promise<TodoRpDto[]>
  findTodoByUserEmailAndTodoId(userId: string, todoId: string): Promise<TodoRpDto>
  createTodo(email: string, todoData: CreateTodoDto): Promise<TodoRpDto>
  updateTodo(email: string, todoId: string, todoData: UpdateTodoDto | CompleteTodoDto): Promise<TodoRpDto>
  deleteTodo(email: string, todoId: string): Promise<TodoRpDto>
}
