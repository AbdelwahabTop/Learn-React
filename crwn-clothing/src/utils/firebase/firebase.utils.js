import { initializeApp } from 'firebase/app';
import { 
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider, 
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
  const userDocRef = doc(db, 'users', userAuth.uid);

  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
}