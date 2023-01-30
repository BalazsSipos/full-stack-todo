import { AppDataSource } from 'data-source'
import { TodoEntity } from 'entity/todos.entity'

export const TodoRepository = AppDataSource.getRepository(TodoEntity).extend({
  findByTodoId(todoId: number) {
    return this.findOne({
      where: {
        id: todoId,
      },
      relations: {
        createdBy: true,
        performedBy: true,
      },
    })
  },
  findOpenTodosByUser(userEmail: string) {
    return this.find({
      relations: {
        createdBy: true,
        performedBy: true,
      },
      where: [
        { completed: false, createdBy: { email: userEmail } },
        { completed: false, performedBy: { email: userEmail } },
      ],
    })
  },
})
