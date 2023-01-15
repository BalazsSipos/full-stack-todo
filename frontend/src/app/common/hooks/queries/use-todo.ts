import { Todo } from '../../../todo/models/Todo'
import { useMutation, useQuery, useQueryClient } from 'react-query'

export const useTodos = (userId: string) => {

  return useQuery<Todo[], unknown>(
    ['todos', 'list', userId],
    async () => {
      try {
        const url = new URL(`/users/${userId}/todos`, process.env.API_URL)
        const fetchResponse = await fetch(url.toString(), {
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
        })

        if (fetchResponse.ok) {
          return ((await fetchResponse.json()) as Todo[]) ?? []
        } else {
          throw new Error(fetchResponse.statusText)
        }
      } catch (e) {
        throw new Error(`Failed get todos of user ${userId}`, { cause: e as Error })
      }
    },
    {
      enabled: true,
      staleTime: 60 * 60 * 1000,
      keepPreviousData: true,
    }
  )
}


export const useTodoCreation = (userId: string) => {
  const queryClient = useQueryClient()

  return useMutation(
    async (todo: Partial<Todo>) => {
      try {
        const url = new URL(`/users/${userId}/todos`, process.env.API_URL)

        const response = await fetch(url.toString(), {
          method: 'POST',
          headers: {
            // Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(todo),
        })

        if (!response.ok) {
          throw new Error(response.statusText)
        }
      } catch (e) {
        throw new Error('Failed to create todo', { cause: e as Error })
      }
    },
    {
      onSuccess: () => queryClient.invalidateQueries(['todos']),
    }
  )
}

export const useTodoPatch = (userId: string) => {
  const queryClient = useQueryClient()

  return useMutation(
    async (todo: Partial<Todo>) => {
      try {
        const url = new URL(`/users/${userId}/todos/${todo.id}`, process.env.API_URL)
        const response = await fetch(url.toString(), {
          method: 'PATCH',
          headers: {
            // Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(todo),
        })

        if (!response.ok) {
          throw new Error(response.statusText)
        }
      } catch (e) {
        throw new Error('Failed to update todo', { cause: e as Error })
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['todos'])
      }
    }
  )
}

export const useTodoDelete = (userId: string) => {
  const queryClient = useQueryClient()

  return useMutation(
    async (todo: Partial<Todo>) => {
      try {
        const url = new URL(`/users/${userId}/todos/${todo.id}`, process.env.API_URL)

        const response = await fetch(url.toString(), {
          method: 'DELETE',
          headers: {
            // Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        })

        if (!response.ok) {
          throw new Error(response.statusText)
        }
      } catch (e) {
        throw new Error('Failed to delete todo', { cause: e as Error })
      }
    },
    {
      onSuccess: () => queryClient.invalidateQueries(['todos']),
    }
  )
}
