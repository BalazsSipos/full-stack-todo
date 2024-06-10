import { User } from '../../models/User';
import { UserItem } from '../../components/UserItem';
import { expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

const user: User = { id: '1', name: 'name 1', email: 'email 1', image: 'image 1', numberOfTodos: 2 };

it('should display user', async () => {
  render(<UserItem user={user} />);

  expect(screen.getByText((content) => content.includes('email 1 (name 1)')));
  expect(screen.getByText((content) => content.includes('Created 2 todos')));
});
