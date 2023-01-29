import { AuthContext } from './AuthContext'
import { PropsWithChildren, useEffect, useState } from 'react'
import { User } from '../../user/models/User'
import { auth } from '../config/firebaseSetup'
import { convertFirebaseUserToUser } from '../hooks/queries/use-user'

export const AuthProvider = (props: PropsWithChildren<unknown>) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        setUser(convertFirebaseUserToUser(firebaseUser))
      } else {
        setUser(null)
      }
    })

    return unsubscribe
  }, [])

  return <AuthContext.Provider value={user}>{props.children}</AuthContext.Provider>
}
