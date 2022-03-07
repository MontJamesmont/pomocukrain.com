// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAFldAmvcPiDykEjxZeDAnyyZhrUXgWYZ8',
  authDomain: 'pomoc-ukraincom.firebaseapp.com',
  projectId: 'pomoc-ukraincom',
  storageBucket: 'pomoc-ukraincom.appspot.com',
  messagingSenderId: '772969775870',
  appId: '1:772969775870:web:4890acc4044329bf859baf'
}

// Initialize Firebase
initializeApp(firebaseConfig)
// Initialize Firestore
const db = getFirestore()

export default db
