import { User } from '../../../models/User';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import firebase from 'firebase/compat';

export const useUsers = () => {
  return useQuery<User[], unknown>(
    ['users', 'list'],
    async () => {
      try {
        const url = new URL(`/users`, process.env.API_URL);
        const fetchResponse = await fetch(url.toString(), {
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
        });

        if (fetchResponse.ok) {
          return ((await fetchResponse.json()) as User[]) ?? [];
        } else {
          throw new Error(fetchResponse.statusText);
        }
      } catch (e) {
        throw new Error(`Failed get users`, { cause: e as Error });
      }
    },
    {
      enabled: true,
      staleTime: 60 * 60 * 1000,
      keepPreviousData: true,
    }
  );
};

export const useUser = (email: string) => {
  const result = useQuery<User, unknown>(
    ['user', 'get', email],
    async () => {
      try {
        const apiUrl = new URL(`/users/${email}`, process.env.EMPLOYEE_API_URL);
        const fetchResponse = await fetch(apiUrl.toString(), {
          headers: {
            // Authorization: `Bearer ${token}`,
          },
        });
        if (fetchResponse.ok) {
          const response: User = await fetchResponse.json();
          if (!response.id) {
            throw new Error('No user was returned');
          }
          return response;
        } else {
          throw new Error(fetchResponse.statusText);
        }
      } catch (e) {
        throw new Error('Failed get results for user: ' + email, { cause: e as Error });
      }
    },
    {
      // enabled: !!token && !authQuery.isStale,
      staleTime: 60 * 60 * 1000,
      keepPreviousData: true,
    }
  );

  return result;
};

export const useUserCreation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (user: Partial<User>) => {
      try {
        const url = new URL(`/users`, process.env.API_URL);
        const response = await fetch(url.toString(), {
          method: 'POST',
          headers: {
            // Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        });

        if (!response.ok) {
          throw new Error(response.statusText);
        }
      } catch (e) {
        throw new Error('Failed to create user', { cause: e as Error });
      }
    },
    {
      onSuccess: () => queryClient.invalidateQueries(['users']),
    }
  );
};

export const convertFirebaseUserToUser = (user: firebase.User): User => {
  return {
    id: user.uid,
    name: user.displayName ? user.displayName : '',
    email: user.email ? user.email : '',
    image: user.photoURL ? user.photoURL : '',
    numberOfTodos: 0,
  };
};
