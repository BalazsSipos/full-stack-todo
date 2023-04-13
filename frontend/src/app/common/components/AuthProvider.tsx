import { AuthContext } from './AuthContext'
import { PropsWithChildren, useEffect, useState } from 'react'
import { auth } from '../config/firebaseSetup'
import firebase from 'firebase/compat'

export interface Context {
  firebaseUser: firebase.User | null
  isLoaded: boolean
}

export const AuthProvider = (props: PropsWithChildren<unknown>) => {
  const [context, setContext] = useState<Context | null>(null)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      const contextObject = {
        firebaseUser: firebaseUser,
        isLoaded: true,
      }
      setContext(contextObject)
    })

    return unsubscribe
  }, [])

  return <AuthContext.Provider value={context}>{props.children}</AuthContext.Provider>
}
