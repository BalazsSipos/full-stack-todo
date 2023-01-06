import { Todo } from '../../../todo/models/Todo'
import { User } from '../../../user/models/User'

export const useTodoList = (): Todo[] => {
  const user1: User = {
    id: '1',
    name: 'user1',
    email: 'email1@email.com',
    image: 'image1',
    numberOfTodos: 1,
  }

  const user2: User = {
    id: '2',
    name: 'user2',
    email: 'email2@email.com',
    image: 'image2',
    numberOfTodos: 3,
  }

  const todo1: Todo = {
    id: '1',
    title: 'own active',
    description: 'description1',
    category: 'sport',
    completed: false,
    location: 'location1',
    progress: 0,
    startingDate: '2023-01-01',
    createdAt: '2022-12-31',
    createdBy: user1,
    performedBy: user1,
  }

  const todo2: Todo = {
    id: '2',
    title: 'foreign_active',
    description: 'description2',
    category: 'work',
    completed: false,
    location: 'location2',
    progress: 10,
    startingDate: '2023-01-02',
    createdAt: '2022-12-31',
    createdBy: user1,
    performedBy: user2,
  }

  const todo3: Todo = {
    id: '3',
    title: 'own_future',
    description: 'description3',
    category: 'other',
    completed: false,
    location: 'location3',
    progress: 0,
    startingDate: '2023-02-02',
    createdAt: '2023-01-02',
    createdBy: user1,
    performedBy: user1,
  }

  const todo4: Todo = {
    id: '4',
    title: 'foreign_assigned_to_me_active',
    description: 'description4',
    category: 'sport',
    completed: false,
    location: 'location4',
    progress: 0,
    startingDate: '2023-01-02',
    createdAt: '2022-12-31',
    createdBy: user2,
    performedBy: user1,
  }

  return [todo1, todo2, todo3, todo4]
}
