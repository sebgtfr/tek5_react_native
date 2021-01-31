import React from 'react';
import PropTypes from 'prop-types';

import { FlatList } from 'react-native';

import ItemsItem, { ItemShapeProps } from './ItemsItem';

const ItemsList = ({ items, myItems }) => (
  <FlatList
    data={items}
    renderItem={({ item }) => <ItemsItem item={item} myItems={myItems} />}
    keyExtractor={({ key }) => key}
  />
);

ItemsList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape(ItemShapeProps)).isRequired,
  myItems: PropTypes.bool.isRequired,
};

export default ItemsList;
