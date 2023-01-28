import 'firebase/compat/auth'
import firebase from 'firebase/compat/app'

// Environment variables should be used later
const firebaseConfig = {
  apiKey: 'AIzaSyAsEZc39iI_smVBWQEIiFNZZHXTktMbIws',
  authDomain: 'pet-todo-9d11d.firebaseapp.com',
  projectId: 'pet-todo-9d11d',
  storageBucket: 'pet-todo-9d11d.appspot.com',
  messagingSenderId: '399900705485',
  appId: '1:399900705485:web:f471a66c6bb5e86480df84',
}

firebase.initializeApp(firebaseConfig)

export const auth = firebase.auth()
