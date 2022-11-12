import { initializeApp } from 'firebase/app';
import { 
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword, 
} from 'firebase/auth';

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCnYhPsUXEJhIoKxOpAwmpWuHyTNTPBuVM",
  authDomain: "crwn-clothing-db-42e1e.firebaseapp.com",
  projectId: "crwn-clothing-db-42e1e",
  storageBucket: "crwn-clothing-db-42e1e.appspot.com",
  messagingSenderId: "498494488838",
  appId: "1:498494488838:web:3d006b0205e0ad788f1e87"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth) => {
  if(!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);

  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);

  // if user data dose not exists
  // creat / set the document with the data from userAuth in my collection
  if(!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt
      })
    } catch (error) {
      console.log('Error creating the user', error.message);
    }
  }

  // if user data exists
  // return userDocRef
  return userDocRef;
}

export const creatAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email || !password) return;

  createUserWithEmailAndPassword(auth, email, password);
}