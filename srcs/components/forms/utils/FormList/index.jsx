import React from 'react';
import PropTypes from 'prop-types';

import { View, FlatList, TouchableOpacity } from 'react-native';
import { Dialog, Portal, Text } from 'react-native-paper';
import { ButtonIntl } from '../../../intl';
import useCollection from '../../../../hooks/useCollection';
import Avatar from '../../../utils/Avatar';

const FormList = ({ items, myItems }) => {
  const itemsCollection = useCollection('items');

  const [visible, setVisible] = React.useState(false);

  const show = React.useCallback(() => setVisible(true), [setVisible]);
  const hide = React.useCallback(() => setVisible(false), [setVisible]);

  const setToSold = React.useCallback((key) => itemsCollection.doc(key).update({ sold: true }), [
    itemsCollection,
  ]);

  return (
    <FlatList
      data={items}
      renderItem={({ item: { name, desc, email, photoURL, key } }) => (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity onPress={show}>
            <Avatar src={photoURL} size={128} square />
            <Text>
              Name: {name}
              {'\n'}
              Description:
              {desc}
              {'\n'}
              By:
              {email}
              {'\n'}
            </Text>
          </TouchableOpacity>
          <Portal>
            <Dialog visible={visible} onDismiss={hide}>
              <Dialog.Content style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <ButtonIntl uppercase title="button.cancel" onSubmit={hide} />
                <ButtonIntl
                  uppercase
                  title={myItems ? 'button.setSold' : 'Button.buy'}
                  onSubmit={() => {
                    setToSold(key);
                    hide();
                  }}
                />
              </Dialog.Content>
            </Dialog>
          </Portal>
        </View>
      )}
      keyExtractor={({ key }) => key}
    />
  );
};

FormList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      desc: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      photoURL: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
    })
  ).isRequired,
  myItems: PropTypes.bool.isRequired,
};

export default FormList;
