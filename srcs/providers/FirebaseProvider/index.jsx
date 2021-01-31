import React from 'react';
import PropTypes from 'prop-types';

import Firebase, { FirebaseStorage } from '../../configs/Firebase';
import useCollection from '../../hooks/useCollection';

// Reducer
import Reducer, { ReducerDefaultState } from './Reducer';

// Callbacks
import Auth from './Auth';

export const FirebaseContext = React.createContext({
  user: null,
  isLogged: false,
});

export const FirebaseConsumer = FirebaseContext.Consumer;

const FirebaseProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(Reducer, ReducerDefaultState);

  const onAuthStateChanged = React.useCallback(
    () => Firebase.auth().onAuthStateChanged((user) => dispatch({ type: 'UPDATE_USER', user })),
    []
  );

  const userCollection = useCollection('users');

  const signUp = React.useCallback(
    (email, password) => Auth.signUp(userCollection, email, password),
    [userCollection]
  );

  const uploadFile = React.useCallback(
    (filename, uri, onProgress = undefined) =>
      fetch(uri)
        .then((response) => response.blob())
        .then((file) => {
          const task = FirebaseStorage.ref(filename).put(file, { contentType: 'image/jpeg' });

          return new Promise((resolve, reject) =>
            task.on(
              'state_changed',
              ({ bytesTransferred, totalBytes }) =>
                onProgress && onProgress((bytesTransferred / totalBytes) * 100),
              reject,
              () => resolve(task.snapshot.ref.getDownloadURL())
            )
          );
        }),
    []
  );

  const edit = React.useCallback(
    (option) =>
      option.photoURL
        ? uploadFile(`profile-${Firebase.auth().currentUser.uid}`, option.photoURL)
            .then((photoURL) => ({ ...option, photoURL }))
            .then((opt) =>
              Firebase.auth()
                .currentUser.updateProfile(opt)
                .then(() => userCollection.doc(Firebase.auth().currentUser.uid).update(opt))
            )
            .then(() => dispatch({ type: 'EDIT_USER', user: option }))
            .catch(() => undefined)
        : Firebase.auth()
            .currentUser.updateProfile(option)
            .then(() => userCollection.doc(Firebase.auth().currentUser.uid).update(option))
            .then(() => dispatch({ type: 'EDIT_USER', user: option }))
            .catch(() => undefined),
    [userCollection, uploadFile]
  );

  React.useEffect(onAuthStateChanged, [onAuthStateChanged]);

  const firebaseContext = React.useMemo(
    () => ({
      // Attributs
      ...state,
      isLogged: state.user !== null,

      // Auth callbacks
      ...{ ...Auth, signUp },

      edit,

      uploadFile,
    }),
    [edit, signUp, uploadFile, state]
  );

  return <FirebaseContext.Provider value={firebaseContext}>{children}</FirebaseContext.Provider>;
};

FirebaseProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default FirebaseProvider;
