import React from 'react';
import { View } from 'react-native';

import { useFocusEffect } from '@react-navigation/native';
import Styles from './Styles';

import ItemForm from '../../components/forms/ItemForm';
import FormList from '../../components/forms/utils/FormList';
import { Firestore } from '../../configs/Firebase';
import { FirebaseContext } from '../../providers/FirebaseProvider';
import { ButtonIntl } from '../../components/intl';

const MyItems = () => {
  const firebase = React.useContext(FirebaseContext);
  const itemsCollection = React.useMemo(() => Firestore.collection('items'), []);
  const userId = React.useMemo(() => firebase.user.uid, [firebase.user.uid]);

  const [soldItems, setSoldItems] = React.useState([]);
  const [notSoldItems, setNotSoldItems] = React.useState([]);
  const [sold, setSold] = React.useState(false);

  useFocusEffect(
    React.useCallback(() => {
      const soldItemsTmp = [];
      const notSoldItemsTmp = [];

      itemsCollection
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
        .catch(() => undefined);
    }, [userId, itemsCollection])
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
