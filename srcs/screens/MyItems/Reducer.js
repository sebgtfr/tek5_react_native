export const defaultReducerValue = {
  soldItems: [],
  notSoldItems: [],
};

const Reducer = (prevState, action) => {
  let src;
  let dest;

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
        src = prevState.soldItems.slice();
        dest = prevState.notSoldItems.slice();
      } else {
        src = prevState.notSoldItems.slice();
        dest = prevState.soldItems.slice();
      }

      dest.push({ ...src[action.index], sold: !action.sold });
      src.splice(action.index, 1);

      return action.sold
        ? {
            ...prevState,
            soldItems: src,
            notSoldItems: dest,
          }
        : {
            ...prevState,
            soldItems: dest,
            notSoldItems: src,
          };
    default:
      return prevState;
  }
};

export default Reducer;
