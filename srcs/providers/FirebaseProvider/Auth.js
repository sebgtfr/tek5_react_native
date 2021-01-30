import Firebase from '../../configs/Firebase';

export default {
  signUp: (userCollection, email, password) =>
    Firebase.auth()
      .createUserWithEmailAndPassword(email, password)
      .then(({ user: { uid: id, displayName, email: userEmail, photoURL } }) =>
        userCollection.doc(id).set({ id, displayName, email: userEmail, photoURL })
      )
      .catch((error) => {
        Firebase.auth().signOut();
        throw error;
      }),

  signIn: (email, password) => Firebase.auth().signInWithEmailAndPassword(email, password),

  signOut: () => Firebase.auth().signOut(),
};
