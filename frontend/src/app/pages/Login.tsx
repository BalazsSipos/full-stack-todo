import * as firebaseui from 'firebaseui'
import { AuthContext } from '../common/components/AuthContext'
import { User } from '../user/models/User'
import { useContext, useEffect } from 'react'
import { useUserCreation } from '../common/hooks/queries/use-user'
import firebase from 'firebase/compat'

interface GoogleUser {
  email: string
  name: string
  picture: string
}

export const Login = ({ auth }: { auth: firebase.auth.Auth }) => {
  const userContext = useContext(AuthContext)
  const createUser = useUserCreation()

  const getUserFromInput = (userInput: GoogleUser) => {
    const user: User = {
      email: userInput.email,
      name: userInput.name,
      image: userInput.picture,
      id: '',
      numberOfTodos: 0,
    }
    return user
  }

  useEffect(() => {
    const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth)

    ui.start('.firebase-auth-container', {
      signInFlow: 'popup',
      signInOptions: [
        {
          provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        },
      ],
      signInSuccessUrl: '/',
      callbacks: {
        signInSuccessWithAuthResult(authResult: firebase.auth.UserCredential, redirectUrl) {
          console.log('authResult', authResult)
          // if (authResult.additionalUserInfo?.isNewUser) {
          const user = getUserFromInput(authResult.additionalUserInfo?.profile as GoogleUser)
          console.log('userFromInput', user)
          createUser.mutate(user)
          // }
          // const googleUser: GoogleUser = authResult.additionalUserInfo?.profile as GoogleUser
          console.log('success')
          console.log(authResult)
          console.log('additional', authResult.additionalUserInfo)
          console.log(redirectUrl)
          return true
        },
      },
    })
  }, [auth, createUser])

  console.log('userContext2', userContext)

  return <>{!userContext && <div className="firebase-auth-container"></div>}</>
}
