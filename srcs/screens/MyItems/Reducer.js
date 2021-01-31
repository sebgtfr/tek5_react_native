export const defaultReducerValue = [];

const Reducer = (prevState = defaultReducerValue, action) => {
  switch (action.type) {
    case 'UPDATE_NAME':
      return {
        ...prevState,
        name: action.name,
      };
    case 'UPDATE_DESC':
      return {
        ...prevState,
        desc: action.desc,
      };
    case 'UPDATE_PRICE':
      return {
        ...prevState,
        price: action.price,
      };
    case 'UPDATE_ADD_LOCATION':
      return {
        ...prevState,
        addLocation: action.addLocation,
      };
    case 'UPDATE_IMAGE':
      return {
        ...prevState,
        image: action.image,
      };
    case 'OPEN_ADD_ITEM_FORM':
      return {
        ...prevState,
        addItemFormVisible: true,
      };
    case 'CLOSE_ADD_ITEM_FORM':
      return { ...defaultReducerValue, addLocation: prevState.addLocation };
    default:
      return prevState;
  }
};

export default Reducer;
