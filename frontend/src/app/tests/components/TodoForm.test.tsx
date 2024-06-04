import { Todo } from '../../models/Todo';
import { createTodo } from '../objectFactory';
import { describe, expect, it } from 'vitest';
import { validateIncomingFormData } from '../../common/utils/validateIncomingFormData';

describe('validateIncomingTodoData()', () => {
  it('should give a validation error, if no mandatory fields have been provided', async () => {
    // Arrange
    const todo = new Todo();

    // Act
    const result = await validateIncomingFormData(todo);
    console.log('result', result);

    // Assert
    expect(result).toEqual({
      title: 'title should not be empty, title must be a string',
      progress:
        'progress must not be greater than 100, progress must not be less than 0, progress must be an integer number',
      startingDate: 'startingDate should not be null or undefined',
      performedByEmail: 'performedByEmail must be an email',
    });
  });

  it('should give undefined, if all mandatory fields have been provided', async () => {
    const todo = createTodo('1');

    const result = await validateIncomingFormData(todo);

    expect(result).toBeUndefined();
  });
});
