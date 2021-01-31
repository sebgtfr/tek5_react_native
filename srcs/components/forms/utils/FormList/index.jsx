import React from 'react';
import PropTypes from 'prop-types';

import { Text, View, FlatList, Image } from 'react-native';

const FormList = ({ items }) => (
  <FlatList
    data={items}
    renderItem={({ item: { name, desc, email, photoURL } }) => (
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Image style={{ width: 128, height: 128 }} source={photoURL} />
        <Text>
          Name: 
{' '}
{name}
          {'\n'}
          Description:
          {desc}
          {'\n'}
          By:
          {email}
          {'\n'}
        </Text>
      </View>
    )}
    keyExtractor={({ key }) => key}
  />
);

FormList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      desc: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      photoURL: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default FormList;
