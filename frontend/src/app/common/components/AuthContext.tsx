import { Context } from './AuthProvider';
import { createContext } from 'react';

export const AuthContext = createContext<Context | null>(null);
