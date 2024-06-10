import { QueryClient, QueryClientProvider } from 'react-query';
import { UserList } from '../../components/UserList';
import { expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

const userList = [
  { id: 1, name: 'name 1', email: 'email 1', image: 'image 1', numberOfTodos: 1 },
  { id: 2, name: 'name 2', email: 'email 2', image: 'image 2', numberOfTodos: 2 },
];

process.env.API_URL = 'http://dummy';

const testFetch = vi.fn(() => {
  return new Promise((resolve) => {
    const testResponse = {
      ok: true,
      json() {
        return new Promise((res) => {
          res(userList);
        });
      },
    };
    resolve(testResponse);
  });
});

vi.stubGlobal('fetch', testFetch);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 0,
      staleTime: 0,
      retry: false,
    },
  },
});

it('should load and display users', async () => {
  render(
    <QueryClientProvider client={queryClient}>
      <UserList />,{/* { wrapper: AllTheProviders } */}
    </QueryClientProvider>
  );

  await screen.findByText('List of users');

  expect(screen.getByText('List of users')).toBeTruthy();
  expect(screen.getByText('email 1 (name 1)')).toBeTruthy();
  expect(screen.getByText('Created 1 todo')).toBeTruthy();
  expect(screen.getByText('email 2 (name 2)')).toBeTruthy();
  expect(screen.getByText('Created 2 todos')).toBeTruthy();
});
