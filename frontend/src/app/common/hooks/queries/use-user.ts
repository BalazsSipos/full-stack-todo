import { User } from '../../../user/models/User'
import { useQuery } from 'react-query';

export const useUsers = () => {
  return useQuery<User[], unknown>(
    ['users', 'list'],
    async () => {
      try {
        const url = new URL(`/users`, process.env.API_URL)
        const fetchResponse = await fetch(url.toString(), {
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
        })

        if (fetchResponse.ok) {
          return ((await fetchResponse.json()) as User[]) ?? []
        } else {
          throw new Error(fetchResponse.statusText)
        }
      } catch (e) {
        throw new Error(`Failed get users`, { cause: e as Error })
      }
    },
    {
      enabled: true,
      staleTime: 60 * 60 * 1000,
      keepPreviousData: true,
    }
  )
}
