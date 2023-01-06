import { CreateTodoDto, UpdateTodoDto } from "@/dtos/todos.dto"
import { User } from "./users.interface"

export interface Todo {
  id: string
  title: string
  description: string
  category: string
  completed: boolean
  location: string
  progress: number
  startingDate: string
  createdAt: string
  createdBy: User
  performedBy: User
}

export interface TodoService {
  findAllTodosByUser(userId: string): Promise<Todo[]>
  findTodoById(userId: string, todoId: string): Promise<Todo>
  createTodo(userId: string, todoData: CreateTodoDto): Promise<Todo>
  updateTodo(userId: string, todoId: string, todoData: UpdateTodoDto): Promise<Todo[]>
  deleteTodo(userId: string, todoId: string): Promise<Todo[]>
}
