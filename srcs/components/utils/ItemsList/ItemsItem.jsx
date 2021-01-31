import React from 'react';
import PropTypes from 'prop-types';

import { View } from 'react-native';
import { Dialog, Portal, Card, Text } from 'react-native-paper';

import useCollection from '../../../hooks/useCollection';

import { ButtonIntl } from '../../intl';
import Avatar from '../Avatar';
import Styles from './Styles';

const ItemsItem = ({
  item: { name, desc, email, photoURL, sold, price, key },
  myItems,
  onUpdate,
  index,
}) => {
  const itemsCollection = useCollection('items');

  const [visible, setVisible] = React.useState(false);

  const show = React.useCallback(() => setVisible(true), [setVisible]);
  const hide = React.useCallback(() => setVisible(false), [setVisible]);
  const toggleSold = React.useCallback(
    () =>
      itemsCollection
        .doc(key)
        .update({ sold: !sold })
        .then(() => onUpdate(index))
        .catch(() => undefined)
        .finally(hide),
    [itemsCollection, key, sold, hide, onUpdate, index]
  );

  return (
    <>
      <Card onPress={show}>
        <Card.Title title={name} subtitle={desc} />
        <Card.Content>
          <View style={Styles.cardContentContainer}>
            <Text style={Styles.cardContentText}>{email}</Text>
            <Text style={Styles.cardContentText}>{`${price} €`}</Text>
          </View>
        </Card.Content>
        <Card.Cover source={{ uri: photoURL }} />
      </Card>
      <Portal>
        <Dialog visible={visible} onDismiss={hide}>
          <Dialog.Content style={Styles.avatar}>
            <Avatar src={photoURL} size={300} square />
          </Dialog.Content>
          <Dialog.Content style={Styles.actionsButtonModal}>
            <ButtonIntl uppercase title="button.cancel" onSubmit={hide} />
            <ButtonIntl
              uppercase
              title={(sold && 'button.unSold') || (myItems ? 'button.setSold' : 'button.buy')}
              onSubmit={toggleSold}
            />
          </Dialog.Content>
        </Dialog>
      </Portal>
    </>
  );
};

export const ItemShapeProps = {
  name: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  photoURL: PropTypes.string.isRequired,
  sold: PropTypes.bool.isRequired,
  price: PropTypes.string.isRequired,
  key: PropTypes.string.isRequired,
};

ItemsItem.propTypes = {
  item: PropTypes.shape(ItemShapeProps).isRequired,
  myItems: PropTypes.bool.isRequired,
  onUpdate: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};

export default ItemsItem;
