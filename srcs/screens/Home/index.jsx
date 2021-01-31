import React from 'react';
import { Text, View, FlatList, Image } from 'react-native';

import Styles from './Styles';

import ItemForm from '../../components/forms/ItemForm';
import useCollection from '../../hooks/useCollection';
import { useFocusEffect } from '@react-navigation/native';
import { FirebaseContext } from '../../providers/FirebaseProvider';
import FormList from '../../components/forms/utils/FormList';

const Home = () => {
  const [items, setItems] = React.useState(false);
  const firebase = React.useContext(FirebaseContext);

  useFocusEffect(
    React.useCallback(() => {
      let list = [];
      useCollection('items')
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            let tmp = {};
            tmp = doc.data();
            tmp._id = doc.id;
            if (tmp.id != firebase.user.uid) {
              list.push(tmp);
            }
          });
          setItems(list);
        });
    }, [])
  );

  return (
    <View style={Styles.container}>
      <ItemForm />
      <Text>Item List</Text>
      <FormList items={items} />
    </View>
  );
};

Home.propTypes = {};

export default Home;
