import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBaCmuwlNoUQufMLaFDIXe82FGnfRUVsRA',
  authDomain: 'oimarket-f7461.firebaseapp.com',
  projectId: 'oimarket-f7461',
  storageBucket: 'oimarket-f7461.appspot.com',
  messagingSenderId: '374434336766',
  appId: '1:374434336766:web:fb61fd2cb89da7738b3aaf',
  measurementId: 'G-GN8P8CYKXL',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
const storage = firebase.storage();
const firebaseAppAuth = firebaseApp.auth();
const database = firebase.database();
// const providers = {
//   googleProvider: new firebase.auth.GoogleAuthProvider(),
// };

export { firestore, storage, firebaseAppAuth, database };

export function signUp(email, password) {
  return firebaseAppAuth.createUserWithEmailAndPassword(email, password);
}

export function signIn(email, password) {
  return firebaseAppAuth.signInWithEmailAndPassword(email, password);
}

export function logout() {
  return firebaseAppAuth.signOut();
}
