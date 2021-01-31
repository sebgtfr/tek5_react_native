import React from 'react';
import PropTypes from 'prop-types';

import { Text, View, FlatList, Image } from 'react-native';
import { Button, Dialog } from 'react-native-paper';
import { ButtonIntl } from '../../../../components/intl';
import useCollection from '../../../../hooks/useCollection';

const FormList = ({ items, myItems }) => {
  const [visible, setVisible] = React.useState(false);

  const show = React.useCallback(() => setVisible(true), [setVisible]);
  const hide = React.useCallback(() => setVisible(false), [setVisible]);

  setToSolde = (key) => {
    useCollection('items').doc(key).update({ solde: true });
  };

  return (
    <FlatList
      data={items}
      renderItem={({ item: { name, desc, email, photoURL, key } }) => (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity onPress={show}>
            <Image style={{ width: 128, height: 128 }} source={photoURL} />
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
                <ButtonIntl
                  uppercase
                  title="button.cancel"
                  onSubmit={() => {
                    hide;
                  }}
                />
                <ButtonIntl
                  uppercase
                  title={myItems ? 'button.setSold' : 'Button.buy'}
                  onSubmit={() => {
                    setToSolde(key);
                    hide;
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
      id: PropTypes.string.isRequired,
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
