import React from 'react';

import * as Location from 'expo-location';

const defaultLocation = { latitude: null, longitude: null, right: false };

const locationReducer = (prevState, action) => {
  switch (action.type) {
    case 'INIT_LOCATION':
      return {
        ...prevState,
        latitude: action.latitude,
        longitude: action.longitude,
        right: action.right,
      };
    case 'UPDATE_RIGHT':
      return {
        ...prevState,
        right: action.right,
      };
    default:
      return prevState;
  }
};

const useLocation = () => {
  const locationReducerCallback = React.useCallback(locationReducer, []);
  const [state, dispatch] = React.useReducer(locationReducerCallback, defaultLocation);

  const hasRight = React.useCallback((status) => status === 'granted', []);

  React.useEffect(() => {
    Location.getPermissionsAsync().then(({ status }) =>
      hasRight(status)
        ? Location.getCurrentPositionAsync().then(({ coords: { longitude, latitude } }) =>
            dispatch({ type: 'INIT_LOCATION', longitude, latitude, right: true })
          )
        : undefined
    );
  }, [hasRight]);

  const requestPermissions = React.useCallback(
    () =>
      Location.requestPermissionsAsync().then(({ status }) =>
        dispatch({ type: 'UPDATE_RIGHT', right: hasRight(status) })
      ),
    [hasRight]
  );

  const getPosition = React.useCallback(
    () =>
      (state.hasPosition &&
        Promise.resolve({ latitude: state.latitude, longitude: state.longitude })) ||
      state.right
        ? Location.getCurrentPositionAsync().then(({ coords: { longitude, latitude } }) => {
            dispatch({ type: 'UPDATE_LOCATION', longitude, latitude });
            return { longitude, latitude };
          })
        : Promise.reject(),
    [state]
  );

  return React.useMemo(
    () => ({
      ...state,
      hasPosition: state.longitude !== null && state.latitude !== null,
      requestPermissions,
      getPosition,
    }),
    [state, requestPermissions, getPosition]
  );
};

export default useLocation;
