import { AppDataSource } from '@/data-source'
import { TodoEntity } from '@/entity/todos.entity'

export const TodoRepository = AppDataSource.getRepository(TodoEntity)
