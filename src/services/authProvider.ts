import { getAuth, GoogleAuthProvider, NextOrObserver, onAuthStateChanged, signInWithPopup, signOut, User } from 'firebase/auth'
import { firebaseApp } from './firebaseConfig'

export const provider = new GoogleAuthProvider()

export const auth = getAuth(firebaseApp);
export const signWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      // The signed-in user info.
      const user = result.user;
      // console.log(user, token)
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    })
}

export const signOff = () => {
  signOut(auth)
    .then(() => console.log('susses'))
    .catch((error) => console.log(error))
}

export const observerAuth = (collback: NextOrObserver<User>) => onAuthStateChanged(auth, collback)
