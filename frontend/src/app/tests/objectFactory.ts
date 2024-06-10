import { Todo } from '../models/Todo';

export const createTodo = (identifier: string): Todo => {
  const todo = new Todo();
  todo.title = `title${identifier}`;
  todo.description = `description${identifier}`;
  todo.category = `category${identifier}`;
  todo.completed = false;
  todo.location = `location${identifier}`;
  todo.progress = 0;
  todo.startingDate = '2020-01-01T00:00:00.000Z';
  todo.performedByEmail = `email@${identifier}.com`;
  return todo;
};
