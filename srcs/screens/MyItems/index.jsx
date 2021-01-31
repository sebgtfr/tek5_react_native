import React from 'react';
import { View } from 'react-native';

import { useFocusEffect } from '@react-navigation/native';
import Styles from './Styles';

import ItemForm from '../../components/forms/ItemForm';
import FormList from '../../components/forms/utils/FormList';
import useCollection from '../../hooks/useCollection';
import { FirebaseContext } from '../../providers/FirebaseProvider';
import { ButtonIntl } from '../../components/intl';

const MyItems = () => {
  const itemsCollection = useCollection('items');

  const [soldItems, setSoldItems] = React.useState([]);
  const [notSoldItems, setNotSoldItems] = React.useState([]);
  const [sold, setSold] = React.useState(false);
  const firebase = React.useContext(FirebaseContext);

  useFocusEffect(
    React.useCallback(() => {
      const soldItemsTmp = [];
      const notSoldItemsTmp = [];

      itemsCollection.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const tmp = { ...doc.data(), id: doc.id, key: doc.id };

          if (tmp.id === firebase.user.uid) {
            if (tmp.sold) {
              soldItemsTmp.push(tmp);
            } else {
              notSoldItemsTmp.push(tmp);
            }
          }
        });
        setSoldItems(soldItemsTmp);
        setNotSoldItems(notSoldItemsTmp);
      });
    }, [firebase.user.uid, itemsCollection])
  );

  return (
    <View style={Styles.container}>
      <View style={{ flexDirection: 'row' }}>
        <ButtonIntl uppercase title="button.notSold" onSubmit={() => setSold(false)} />
        <ButtonIntl uppercase title="button.sold" onSubmit={() => setSold(true)} />
      </View>
      <ItemForm />
      <FormList items={sold ? soldItems : notSoldItems} myItems />
    </View>
  );
};

MyItems.propTypes = {};

export default MyItems;
