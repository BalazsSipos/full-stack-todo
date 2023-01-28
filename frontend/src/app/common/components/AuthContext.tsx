import { User } from '../../user/models/User'
import { createContext } from 'react'

export const AuthContext = createContext<User | null>(null)
