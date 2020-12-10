import React from 'react';

import Firebase from '../../configs/Firebase';

// Callbacks
import Auth from './Auth';

export const FirebaseContext = React.createContext({
    user: null,
    isLogged: false,
});

export const FirebaseConsumer = FirebaseContext.Consumer;

const FirebaseProvider = ({ children }) =>
{
    //const [isLoading, setLoadingState] = React.useState(true);
    const [user, setUser] = React.useState(null);

    React.useEffect(
        React.useCallback(() =>
        {
            Firebase.auth().onAuthStateChanged(setUser);
        }, [setUser]),
    [setUser]);

    const firebaseContext = React.useMemo(() =>
    ({
        // Attributs
        user,
        isLogged: user !== null,

        // Auth callbacks
        ...Auth,
    }),
    [user]);

    return (
        <FirebaseContext.Provider value={firebaseContext}>
            {children}
        </FirebaseContext.Provider>
    );
};

export default FirebaseProvider;