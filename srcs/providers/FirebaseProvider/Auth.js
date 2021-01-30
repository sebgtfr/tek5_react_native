import Firebase from '../../configs/Firebase';
import useCollection from '../../hooks/useCollection';

export default {
  signUp: (email, password) =>
    Firebase.auth()
      .createUserWithEmailAndPassword(email, password)
      .then(({ user: { uid: id, displayName, email: userEmail, photoURL } }) =>
        useCollection('users').doc(id).set({ id, displayName, email: userEmail, photoURL })
      )
      .catch((error) => {
        Firebase.auth().signOut();
        throw error;
      }),

  signIn: (email, password) => Firebase.auth().signInWithEmailAndPassword(email, password),

  signOut: () => Firebase.auth().signOut(),

  edit: (option) =>
    Firebase.auth()
      .currentUser.updateProfile(option)
      .then(() => useCollection('users').doc(Firebase.auth().currentUser.uid).update(option))
      .catch((error) => {
        console.log(error);
        console.log(Firebase.auth().currentUser.id);
        throw error;
      }),
};
