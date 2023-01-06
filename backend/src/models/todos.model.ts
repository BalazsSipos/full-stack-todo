import { Todo } from '@/interfaces/todos.interface'

export const todoModel: Todo[] = [
  {
    id: '1',
    title: 'title1',
    description: 'description1',
    category: 'sport',
    completed: false,
    location: 'location1',
    progress: 0,
    startingDate: '2023-01-02',
    createdAt: '2023-01-01',
    createdBy: {
      id: '1',
      email: 'example1@email.com',
      password: '$2b$10$TBEfaCe1oo.2jfkBDWcj/usBj4oECsW2wOoDXpCa2IH9xqCpEK/hC',
    },
    performedBy: {
      id: '1',
      email: 'example1@email.com',
      password: '$2b$10$TBEfaCe1oo.2jfkBDWcj/usBj4oECsW2wOoDXpCa2IH9xqCpEK/hC',
    }
  },
  {
    id: '2',
    title: 'title2',
    description: 'description2',
    category: 'other',
    completed: false,
    location: 'location2',
    progress: 0,
    startingDate: '2023-01-10',
    createdAt: '2023-01-01',
    createdBy: {
      id: '1',
      email: 'example1@email.com',
      password: '$2b$10$TBEfaCe1oo.2jfkBDWcj/usBj4oECsW2wOoDXpCa2IH9xqCpEK/hC',
    },
    performedBy: {
      id: '2',
      email: 'example2@email.com',
      password: '$2b$10$TBEfaCe1oo.2jfkBDWcj/usBj4oECsW2wOoDXpCa2IH9xqCpEK/hC',
    }
  },
  {
    id: '3',
    title: 'title3',
    description: 'description3',
    category: 'other',
    completed: true,
    location: 'location3',
    progress: 0,
    startingDate: '2023-01-04',
    createdAt: '2023-01-3',
    createdBy: {
      id: '2',
      email: 'example2@email.com',
      password: '$2b$10$TBEfaCe1oo.2jfkBDWcj/usBj4oECsW2wOoDXpCa2IH9xqCpEK/hC',
    },
    performedBy: {
      id: '1',
      email: 'example1@email.com',
      password: '$2b$10$TBEfaCe1oo.2jfkBDWcj/usBj4oECsW2wOoDXpCa2IH9xqCpEK/hC',
    }
  }
]
