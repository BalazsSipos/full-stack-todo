export const todoStatuses = ['Open', 'Done', 'Obsolete'] as const
export type TodoStatus = typeof todoStatuses[number]

export interface Todo {
  id: string
  title: string
  description: string
  category: string
  completed: boolean
  location: string
  progress: number
  startingDate: string
  createdAt: string
  createdBy: string
  performedBy: string
}
