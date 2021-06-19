import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

firebase.initializeApp({
  apiKey: "AIzaSyBYM8cUHwtNL1fa2Xl3WzUpD2FcYlNIW9w",
  authDomain: "precursor-editor.firebaseapp.com",
  projectId: "precursor-editor",
  storageBucket: "precursor-editor.appspot.com",
  messagingSenderId: "771001756394",
  appId: "1:771001756394:web:c9eb4c2f205a3b86718593",
  measurementId: "G-H6FYC5WR88"
})

export const auth = firebase.auth()
export const firestore = firebase.firestore()