import { Todo } from '@/interfaces/todos.interface'

export const todoModel: Todo[] = [
  {
    id: '1',
    title: 'Go to the gym with much energy',
    description: 'Full body gym workout',
    category: 'sport',
    completed: false,
    location: 'Nemes Fitness',
    progress: 0,
    startingDate: '2023-01-02',
    createdAt: '2023-01-01',
    createdBy: '1',
    performedBy: '1'
  },
  {
    id: '2',
    title: 'Cook lunch',
    description: 'Cook lunch for the whole family',
    category: 'food',
    completed: false,
    location: '',
    progress: 0,
    startingDate: '2023-01-10',
    createdAt: '2023-01-01',
    createdBy: '1',
    performedBy: '2'
  },
  {
    id: '3',
    title: 'Buy new headphones',
    description: 'https://www.basys.hu/energy-headphones-2-bluetooth-blue.html',
    category: 'other',
    completed: false,
    location: '',
    progress: 50,
    startingDate: '2023-01-15',
    createdAt: '2023-01-3',
    createdBy: '1',
    performedBy: '1'
  },
]