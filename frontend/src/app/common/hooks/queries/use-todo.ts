import { AuthContext } from '../../components/AuthContext'
import { Todo } from '../../../todo/models/Todo'
import { useContext } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'

export const useTodos = (userEmail: string, token: string | undefined) => {
  const navigate = useNavigate()
  const context = useContext(AuthContext)
  const firebaseUser = context?.firebaseUser ?? null

  return useQuery<Todo[], unknown>(
    ['todos', 'list', userEmail, token !== 'invalid'],
    async () => {
      if (token === 'invalid' && firebaseUser) {
        return []
      }
      try {
        const url = new URL(`/users/${userEmail}/todos`, process.env.API_URL)
        const fetchResponse = await fetch(url.toString(), {
          headers: {
            authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })

        if (fetchResponse.ok) {
          return ((await fetchResponse.json()) as Todo[]) ?? []
        } else {
          if (fetchResponse.status === 401) {
            navigate('/login')
          }
          if (fetchResponse.status === 403) {
            navigate('/')
          }
          throw new Error(fetchResponse.statusText)
        }
      } catch (e) {
        throw new Error(`Failed get todos of user ${userEmail}`, { cause: e as Error })
      }
    },
    {
      enabled: true,
      staleTime: 60 * 60 * 1000,
      keepPreviousData: true,
    }
  )
}

export const useTodoCreation = (email: string) => {
  const queryClient = useQueryClient()

  return useMutation(
    async (todo: Partial<Todo>) => {
      try {
        const url = new URL(`/users/${email}/todos`, process.env.API_URL)

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
      onSuccess: () =>
        Promise.all([queryClient.invalidateQueries(['todos']), queryClient.invalidateQueries(['users', 'list'])]),
    }
  )
}

export const useTodoPatch = (email: string, todoId: number) => {
  const queryClient = useQueryClient()

  return useMutation(
    async (todo: Partial<Todo>) => {
      try {
        const url = new URL(`/users/${email}/todos/${todoId}`, process.env.API_URL)
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
      onSuccess: () =>
        Promise.all([queryClient.invalidateQueries(['todos']), queryClient.invalidateQueries(['users', 'list'])]),
    }
  )
}

export const useTodoDelete = (email: string, todoId: number) => {
  const queryClient = useQueryClient()

  return useMutation(
    async () => {
      try {
        const url = new URL(`/users/${email}/todos/${todoId}`, process.env.API_URL)

        const response = await fetch(url.toString(), {
          method: 'DELETE',
          headers: {
            // Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })

        if (!response.ok) {
          throw new Error(response.statusText)
        }
      } catch (e) {
        throw new Error('Failed to delete todo', { cause: e as Error })
      }
    },
    {
      onSuccess: () =>
        Promise.all([queryClient.invalidateQueries(['todos']), queryClient.invalidateQueries(['users', 'list'])]),
    }
  )
}
