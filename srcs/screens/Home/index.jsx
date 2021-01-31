import React from 'react';
import { Text, View, FlatList } from 'react-native';

import { useFocusEffect } from '@react-navigation/native';
import Styles from './Styles';

import ItemForm from '../../components/forms/ItemForm';
import useCollection from '../../hooks/useCollection';

const Home = () => {
  const [items, setItems] = React.useState(false);

  useFocusEffect(
    React.useCallback(() => {
      const list = [];
      useCollection('items')
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            let tmp = {};
            tmp = doc.data();
            tmp._id = doc.id;
            list.push(tmp);
          });
          setItems(list);
        });
    }, [])
  );

  return (
    <View style={Styles.container}>
      <ItemForm />
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <Text>
            Name: {item.name}
            {'\n'}
            Description:
            {item.desc}
            {'\n'}
            By:
            {item.email}
            {'\n'}
          </Text>
        )}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};

Home.propTypes = {};

export default Home;
