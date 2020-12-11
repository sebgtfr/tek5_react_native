import Firebase from '../../configs/Firebase';

export default {
  signUp: (email, password) => Firebase.auth().createUserWithEmailAndPassword(email, password),

  signIn: (email, password) => Firebase.auth().signInWithEmailAndPassword(email, password),

  signOut: () => Firebase.auth().signOut(),
};
