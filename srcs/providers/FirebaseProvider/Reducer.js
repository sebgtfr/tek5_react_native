export const ReducerDefaultState = {
  user: null,
  isLoading: true,
};

const Reducer = (prevState, action) => {
  switch (action.type) {
    case 'UPDATE_USER':
      return {
        ...prevState,
        user: action.user,
        isLoading: false,
      };

    default:
      return prevState;
  }
};

export default Reducer;
