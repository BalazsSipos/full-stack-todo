import { AuthContext } from '../../components/AuthContext';
import { Todo } from '../../../models/Todo';
import { useContext } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';

export const useTodos = (requestedEmail: string, token: string | undefined, onlyOpenTodos: string) => {
  const navigate = useNavigate();
  const context = useContext(AuthContext);
  const firebaseUser = context?.firebaseUser ?? null;

  return useQuery<Todo[], unknown>(
    ['todos', 'list', requestedEmail, firebaseUser?.email, token !== 'invalid', onlyOpenTodos],
    async () => {
      try {
        const url = new URL(`/todos?user=${requestedEmail}&open=${onlyOpenTodos}`, process.env.API_URL);
        const fetchResponse = await fetch(url.toString(), {
          headers: {
            authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (fetchResponse.ok) {
          return ((await fetchResponse.json()) as Todo[]) ?? [];
        } else {
          if (fetchResponse.status === 401) {
            navigate('/login');
          }
          if (fetchResponse.status === 403) {
            navigate('/');
          }
          throw new Error(fetchResponse.statusText);
        }
      } catch (e) {
        throw new Error(`Failed get todos of user ${requestedEmail}`, { cause: e as Error });
      }
    },
    {
      enabled: token !== 'invalid' && requestedEmail !== '',
      staleTime: 60 * 60 * 1000,
      keepPreviousData: true,
    }
  );
};

export const useTodoCreation = (email: string, token: string) => {
  const queryClient = useQueryClient();

  return useMutation<unknown, Error, Partial<Todo>, unknown>(
    async (todo: Partial<Todo>) => {
      const url = new URL(`/todos?user=${email}`, process.env.API_URL);

      const response = await fetch(url.toString(), {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
      });

      const json = await response.json();
      if (!response.ok) {
        const error = new Error(json.message);
        throw error;
      }
      return json;
    },
    {
      onSuccess: () =>
        Promise.all([queryClient.invalidateQueries(['todos']), queryClient.invalidateQueries(['users', 'list'])]),
    }
  );
};

export const useTodoPatch = (email: string, token: string, todoId: number) => {
  const queryClient = useQueryClient();

  return useMutation<unknown, Error, Partial<Todo>, unknown>(
    async (todo: Partial<Todo>) => {
      // try {
      const url = new URL(`/todos/${todoId}?user=${email}`, process.env.API_URL);
      const response = await fetch(url.toString(), {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
      });

      const json = await response.json();
      if (!response.ok) {
        const error = new Error(json.message);
        // error.message = json.message;
        throw error;
      }
      return json;
      // } catch (e) {
      //   console.log('error eeeeee', e);
      //   // throw new Error('Failed to create todo2', { cause: e as Error });
      //   throw e;
      // }
    },
    {
      onSuccess: () =>
        Promise.all([queryClient.invalidateQueries(['todos']), queryClient.invalidateQueries(['users', 'list'])]),
    }
  );
};

export const useTodoDelete = (email: string, token: string, todoId: number) => {
  const queryClient = useQueryClient();

  return useMutation(
    async () => {
      try {
        const url = new URL(`/todos/${todoId}?user=${email}`, process.env.API_URL);

        const response = await fetch(url.toString(), {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(response.statusText);
        }
      } catch (e) {
        throw new Error('Failed to delete todo', { cause: e as Error });
      }
    },
    {
      onSuccess: () =>
        Promise.all([queryClient.invalidateQueries(['todos']), queryClient.invalidateQueries(['users', 'list'])]),
    }
  );
};
