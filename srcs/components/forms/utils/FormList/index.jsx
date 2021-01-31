import React from 'react';
import { Text, View, FlatList, Image } from 'react-native';

const FormList = ({ items }) => {
  return (
    <>
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Image style={{ width: 128, height: 128 }} source={item.photoURL} />
            <Text>
              Name: {item.name}
              {'\n'}Description: {item.desc}
              {'\n'}By: {item.email}
              {'\n'}
            </Text>
          </View>
        )}
        keyExtractor={(item) => item._id}
      />
    </>
  );
};

export default FormList;
