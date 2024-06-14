import { AppDataSource } from '../data-source';
import { LessThan } from 'typeorm';
import { TodoEntity } from '../entity/todos.entity';

export const TodoRepository = AppDataSource.getRepository(TodoEntity).extend({
  findByTodoId(todoId: number): TodoEntity {
    return this.findOne({
      where: {
        id: todoId,
      },
      relations: {
        createdBy: true,
        performedBy: true,
      },
    });
  },
  findOpenTodosByUser(userEmail: string): TodoEntity[] {
    return this.find({
      relations: {
        createdBy: true,
        performedBy: true,
      },
      where: [
        { completed: false, createdBy: { email: userEmail } },
        { completed: false, performedBy: { email: userEmail } },
      ],
      order: {
        startingDate: 'ASC',
        title: 'ASC',
      },
    });
  },
  findOpenAndDueTodosByUser(userEmail: string): TodoEntity[] {
    const today = new Date(Date.now());
    return this.find({
      relations: {
        createdBy: true,
        performedBy: true,
      },
      where: [
        { completed: false, startingDate: LessThan(today), createdBy: { email: userEmail } },
        { completed: false, startingDate: LessThan(today), performedBy: { email: userEmail } },
      ],
      order: {
        startingDate: 'ASC',
        title: 'ASC',
      },
    });
  },
});
