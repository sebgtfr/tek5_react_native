import React from 'react';

import { View } from 'react-native';
import { Portal, Dialog, FAB } from 'react-native-paper';

import { ButtonIntl, TextIntl } from '../../intl';
import { FormButton, FormInput, FormAvatar } from '../utils';
import Switch from '../../utils/Switch';

import useCollection from '../../../hooks/useCollection';
import useLocation from '../../../hooks/useLocation';

import { FirebaseConsumer } from '../../../providers/FirebaseProvider';

import Reducer, { defaultReducerValue } from './Reducer';

import Styles from './Styles';

const ItemForm = () => {
  const location = useLocation();
  const itemsCollection = useCollection('items');

  const [{ name, desc, addLocation, image, addItemFormVisible }, dispatch] = React.useReducer(
    Reducer,
    defaultReducerValue
  );

  const setName = React.useCallback((_name) => dispatch({ type: 'UPDATE_NAME', name: _name }), []);
  const setDesc = React.useCallback((_desc) => dispatch({ type: 'UPDATE_DESC', desc: _desc }), []);
  const setAddLocation = React.useCallback(
    (_addLocation) => dispatch({ type: 'UPDATE_ADD_LOCATION', addLocation: _addLocation }),
    []
  );
  const setImage = React.useCallback(
    (_image) => dispatch({ type: 'UPDATE_IMAGE', image: _image }),
    []
  );
  const OpenAddItemForm = React.useCallback(() => dispatch({ type: 'OPEN_ADD_ITEM_FORM' }), []);
  const CloseAddItemForm = React.useCallback(() => dispatch({ type: 'CLOSE_ADD_ITEM_FORM' }), []);

  React.useEffect(() => {
    setAddLocation(location.hasPosition);
  }, [location.hasPosition, setAddLocation]);

  return (
    <>
      <FAB icon="plus" style={Styles.fab} onPress={OpenAddItemForm} visible={!addItemFormVisible} />
      <Portal>
        <Dialog visible={addItemFormVisible} onDismiss={CloseAddItemForm}>
          <Dialog.Title>
            <TextIntl id="title.item.add" />
          </Dialog.Title>
          <Dialog.Content>
            <View style={Styles.imageContainer}>
              <FormAvatar size={128} type="uri" onChange={setImage} square />
            </View>
            <FormInput label="item.name" value={name} returnKeyType="next" onChangeText={setName} />
            <FormInput label="item.desc" value={desc} returnKeyType="next" onChangeText={setDesc} />
            <Switch value={addLocation} onValueChange={setAddLocation} leftText="text.location" />
          </Dialog.Content>
          <Dialog.Actions style={Styles.dialogActionsButtons}>
            <ButtonIntl title="button.cancel" uppercase onSubmit={CloseAddItemForm} />
            <FirebaseConsumer>
              {(firebase) => (
                <FormButton
                  title="addItem"
                  uppercase
                  onSubmit={() => {
                    const item = {
                      name,
                      desc,
                      email: firebase.user.email,
                      userId: firebase.user.uid,
                      solde: false,
                    };

                    const saveItem = Promise.all([
                      firebase.uploadFile(`${item.name}-${item.userId}-${Date.now()}`, image),
                      addLocation
                        ? location
                            .getPosition()
                            .then(({ longitude, latitude }) =>
                              itemsCollection.add({ ...item, longitude, latitude })
                            )
                        : itemsCollection.add(item),
                    ]);

                    saveItem
                      .then(([photoURL, newItem]) => newItem.update({ photoURL }))
                      .catch(() => undefined);
                  }}
                />
              )}
            </FirebaseConsumer>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
};

ItemForm.propTypes = {};

export default ItemForm;
