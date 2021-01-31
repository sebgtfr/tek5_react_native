import React from 'react';
import { View } from 'react-native';

import { useFocusEffect } from '@react-navigation/native';
import Styles from './Styles';

import ItemForm from '../../components/forms/ItemForm';
import { FirebaseContext } from '../../providers/FirebaseProvider';
import { Firestore } from '../../configs/Firebase';
import FormList from '../../components/forms/utils/FormList';

const Home = () => {
  const [items, setItems] = React.useState([]);
  const firebase = React.useContext(FirebaseContext);
  const itemsCollection = React.useMemo(() => Firestore.collection('items'), []);
  const userId = React.useMemo(() => firebase.user.uid, [firebase.user.uid]);

  useFocusEffect(
    React.useCallback(() => {
      const list = [];

      itemsCollection.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const tmp = doc.data();

          if (tmp.userId !== userId && tmp.sold === false) {
            list.push({ ...tmp, key: doc.id });
          }
        });
        setItems(list);
      });
    }, [userId, itemsCollection])
  );

  return (
    <View style={Styles.container}>
      <ItemForm />
      <FormList items={items} myItems={false} />
    </View>
  );
};

Home.propTypes = {};

export default Home;
