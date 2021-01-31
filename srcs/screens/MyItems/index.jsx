import React from 'react';
import { View } from 'react-native';

import { useFocusEffect } from '@react-navigation/native';
import Styles from './Styles';

import ItemForm from '../../components/forms/ItemForm';
import FormList from '../../components/forms/utils/FormList';
import { Firestore } from '../../configs/Firebase';
import { FirebaseContext } from '../../providers/FirebaseProvider';
import { ButtonIntl } from '../../components/intl';
import Reducer, { defaultReducerValue } from './Reducer';

const MyItems = () => {
  const firebase = React.useContext(FirebaseContext);
  const itemsCollection = React.useMemo(() => Firestore.collection('items'), []);
  const userId = React.useMemo(() => firebase.user.uid, [firebase.user.uid]);

  //const [soldItems, setSoldItems] = React.useState([]);
  //const [notSoldItems, setNotSoldItems] = React.useState([]);
  const [sold, setSold] = React.useState(false);

  const [{ soldItems, notSoldItems }, dispatch] = React.useReducer(Reducer, defaultReducerValue);

  const setSoldItems = React.useCallback(
    (pSoldItems) => dispatch({ type: 'SET_SOLD_ITEMS', soldItems: pSoldItems }),
    []
  );
  const setNotSoldItems = React.useCallback(
    (pNotSoldItems) => dispatch({ type: 'SET_NOT_SOLD_ITEMS', notSoldItems: pNotSoldItems }),
    []
  );
  const updateItems = React.useCallback(
    (pNotSoldItems, pSoldItems, pSold, pIndex) =>
      dispatch({
        type: 'UPDATE_LIST',
        notSoldItems: pNotSoldItems,
        soldItems: pSoldItems,
        sold: pSold,
        index: pIndex,
      }),
    []
  );

  useFocusEffect(
    React.useCallback(() => {
      const soldItemsTmp = [
        {
          name: 'test',
          desc: 'test',
          email: 'test',
          userId: 'test',
          sold: true,
          price: 50,
          key: 'test',
        },
      ];
      const notSoldItemsTmp = [
        {
          name: 'test2',
          desc: 'test2',
          email: 'test2',
          userId: 'test2',
          sold: false,
          price: 50,
          key: 'test2',
        },
      ];

      /*itemsCollection
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const tmp = doc.data();

            if (tmp.userId === userId) {
              if (tmp.sold) {
                soldItemsTmp.push({ ...tmp, key: doc.id });
              } else {
                notSoldItemsTmp.push({ ...tmp, key: doc.id });
              }
            }
          });
          setSoldItems(soldItemsTmp);
          setNotSoldItems(notSoldItemsTmp);
        })
        .catch(() => undefined);*/
      setSoldItems(soldItemsTmp);
      setNotSoldItems(notSoldItemsTmp);
    }, [userId, itemsCollection])
  );

  return (
    <View style={Styles.container}>
      <View style={{ flexDirection: 'row' }}>
        <ButtonIntl uppercase title="button.notSold" onSubmit={() => setSold(false)} />
        <ButtonIntl uppercase title="button.sold" onSubmit={() => setSold(true)} />
      </View>
      <ItemForm />
      <FormList
        items={sold ? soldItems : notSoldItems}
        myItems
        onChange={updateItems}
        soldItems={soldItems}
        notSoldItems={notSoldItems}
      />
    </View>
  );
};

MyItems.propTypes = {};

export default MyItems;
