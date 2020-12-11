import React from 'react';
import PropTypes from 'prop-types';

import Firebase from '../../configs/Firebase';

// Callbacks
import Auth from './Auth';

export const FirebaseContext = React.createContext({
  user: null,
  isLogged: false,
});

export const FirebaseConsumer = FirebaseContext.Consumer;

const FirebaseProvider = ({ children }) => {
  // const [isLoading, setLoadingState] = React.useState(true);
  const [user, setUser] = React.useState(null);
  const onAuthStateChanged = React.useCallback(() => {
    Firebase.auth().onAuthStateChanged(setUser);
  }, []);

  React.useEffect(onAuthStateChanged, [onAuthStateChanged]);

  const firebaseContext = React.useMemo(
    () => ({
      // Attributs
      user,
      isLogged: user !== null,

      // Auth callbacks
      ...Auth,
    }),
    [user]
  );

  return <FirebaseContext.Provider value={firebaseContext}>{children}</FirebaseContext.Provider>;
};

FirebaseProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default FirebaseProvider;
