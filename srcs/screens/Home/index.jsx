import React from 'react';
import { View } from 'react-native';

import { useFocusEffect } from '@react-navigation/native';
import Styles from './Styles';

import ItemForm from '../../components/forms/ItemForm';
import useCollection from '../../hooks/useCollection';
import { FirebaseContext } from '../../providers/FirebaseProvider';
import FormList from '../../components/forms/utils/FormList';

const Home = () => {
  const [items, setItems] = React.useState([]);
  const firebase = React.useContext(FirebaseContext);
  const itemsCollection = useCollection('items');

  useFocusEffect(
    React.useCallback(() => {
      const list = [];
      itemsCollection.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const tmp = doc.data();

          if (tmp.userId !== firebase.user.uid && tmp.sold === false) {
            list.push({ ...tmp, key: doc.id });
          }
        });
        setItems(list);
      });
    }, [firebase.user.uid, itemsCollection])
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
