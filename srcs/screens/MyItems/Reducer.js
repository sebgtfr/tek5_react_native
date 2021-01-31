export const defaultReducerValue = [];

const Reducer = (prevState = defaultReducerValue, action) => {
  switch (action.type) {
    case 'SET_SOLD_ITEMS':
      return {
        ...prevState,
        soldItems: action.soldItems,
      };
    case 'SET_NOT_SOLD_ITEMS':
      return {
        ...prevState,
        notSoldItems: action.notSoldItems,
      };
    case 'UPDATE_LIST':
      if (action.sold) {
        action.notSoldItems.push(action.soldItems[action.index]);
        action.soldItems.splice(index, 1);
      } else {
        action.soldItems.push(action.notSoldItems[action.index]);
        action.notSoldItems.splice(index, 1);
      }
      return {
        ...prevState,
        soldItems: action.soldItems,
        notSoldItems: action.notSoldItems,
      };
    default:
      return prevState;
  }
};

export default Reducer;
