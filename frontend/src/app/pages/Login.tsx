import * as firebaseui from 'firebaseui';
import { AuthContext } from '../common/components/AuthContext';
import { User } from '../models/User';
import { useContext, useEffect } from 'react';
import { useUserCreation } from '../common/hooks/queries/use-user';
import firebase from 'firebase/compat';

interface GoogleUser {
  email: string;
  name: string;
  picture: string;
}

export const Login = ({ auth }: { auth: firebase.auth.Auth }) => {
  const context = useContext(AuthContext);
  const firebaseUser = context?.firebaseUser ?? null;
  const createUser = useUserCreation();

  const getUserFromInput = (userInput: GoogleUser) => {
    const user: User = {
      email: userInput.email,
      name: userInput.name,
      image: userInput.picture,
      id: '',
      numberOfTodos: 0,
    };
    return user;
  };

  useEffect(() => {
    const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth);

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
          const user = getUserFromInput(authResult.additionalUserInfo?.profile as GoogleUser);
          createUser.mutate(user);
          return true;
        },
      },
    });
  }, [auth, createUser]);

  return <>{!firebaseUser && <div className="firebase-auth-container"></div>}</>;
};
