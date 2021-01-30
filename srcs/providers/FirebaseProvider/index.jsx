import React from 'react';
import PropTypes from 'prop-types';

import Firebase from '../../configs/Firebase';
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

  const edit = React.useCallback(
    (option) =>
      Firebase.auth()
        .currentUser.updateProfile(option)
        .then(() => userCollection.doc(Firebase.auth().currentUser.uid).update(option))
        .then(() => dispatch({ type: 'EDIT_USER', user: option }))
        .catch(),
    [userCollection]
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
    }),
    [edit, signUp, state]
  );

  return <FirebaseContext.Provider value={firebaseContext}>{children}</FirebaseContext.Provider>;
};

FirebaseProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default FirebaseProvider;
