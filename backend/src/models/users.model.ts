import { UserRpDto } from '@/dtos/users.dto'

// password: password
export const userModel: UserRpDto[] = [
  { id: '1', email: 'example1@email.com', name: 'name1', image: 'image1', numberOfTodos: 2 },
  { id: '2', email: 'example2@email.com', name: 'name2', image: 'image2', numberOfTodos: 1 },
  { id: '3', email: 'example3@email.com', name: 'name3', image: 'image3', numberOfTodos: 3 },
  { id: '4', email: 'example4@email.com', name: 'name4', image: 'image4', numberOfTodos: 0 },
]
