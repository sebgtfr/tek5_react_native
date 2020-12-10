import Firebase from '../../configs/Firebase';

export default {
    signUp: (email : string, password : string) => Firebase.auth().createUserWithEmailAndPassword(email, password),

    signIn: (email : string, password : string) => Firebase.auth().signInWithEmailAndPassword(email, password),

    signOut: () => Firebase.auth().signOut(),
}