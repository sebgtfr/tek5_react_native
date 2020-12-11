import React from 'react';
import PropTypes from 'prop-types';

import Firebase from '../../configs/Firebase';

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

  const onAuthStateChanged = React.useCallback(() => {
    Firebase.auth().onAuthStateChanged((user) => dispatch({ type: 'UPDATE_USER', user }));
  }, []);

  React.useEffect(onAuthStateChanged, [onAuthStateChanged]);

  const firebaseContext = React.useMemo(
    () => ({
      // Attributs
      ...state,
      isLogged: state.user !== null,

      // Auth callbacks
      ...Auth,
    }),
    [state]
  );

  return <FirebaseContext.Provider value={firebaseContext}>{children}</FirebaseContext.Provider>;
};

FirebaseProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default FirebaseProvider;
