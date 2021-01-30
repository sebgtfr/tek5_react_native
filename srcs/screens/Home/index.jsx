import React from 'react';
import { Text, View, FlatList } from 'react-native';

import Styles from './Styles';

import ItemForm from '../../components/forms/ItemForm';
import useCollection from '../../hooks/useCollection';
import {useFocusEffect} from '@react-navigation/native';

const Home = () => {

  const [items, setItems] = React.useState(false);

  useFocusEffect(
    React.useCallback(() => {
      let list = []
    useCollection('items').get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          let tmp = {}
          tmp = doc.data()
          tmp._id = doc.id
          list.push(tmp)
      });
      setItems(list);
    })
    }, []),
    );
  

  return (
    <View style={Styles.container}>
    <ItemForm/>
    <Text>Item List</Text>
    <FlatList
              data={items}
              renderItem={({item}) => (
                <Text>
                  Name: {item.name}
                  {'\n'}Description: {item.desc}
                  {'\n'}
                </Text>
              )}
              keyExtractor={(item) => item._id}
            />
    </View>
  )
    
  };

Home.propTypes = {};

export default Home;
