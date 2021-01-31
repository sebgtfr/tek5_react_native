import React from 'react';
import PropTypes from 'prop-types';

import { FlatList } from 'react-native';

import ItemsItem, { ItemShapeProps } from './ItemsItem';

const ItemsList = ({ items, myItems, onUpdate }) => (
  <FlatList
    data={items}
    renderItem={({ item, index }) => (
      <ItemsItem item={item} myItems={myItems} onUpdate={onUpdate} index={index} />
    )}
    keyExtractor={({ key }) => key}
  />
);

ItemsList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape(ItemShapeProps)).isRequired,
  myItems: PropTypes.bool.isRequired,
  onUpdate: PropTypes.func,
};

ItemsList.defaultProps = {
  onUpdate: () => undefined,
};

export default ItemsList;
