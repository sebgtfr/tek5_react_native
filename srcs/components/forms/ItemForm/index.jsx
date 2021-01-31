import React from 'react';

import { View } from 'react-native';
import { Portal, Dialog, FAB, Text } from 'react-native-paper';

import { ButtonIntl, TextIntl } from '../../intl';
import { FormButton, FormInput, FormAvatar } from '../utils';
import Switch from '../../utils/Switch';

import useCollection from '../../../hooks/useCollection';
import useLocation from '../../../hooks/useLocation';

import { FirebaseConsumer } from '../../../providers/FirebaseProvider';
import { IntlContext } from '../../../providers/IntlProvider';

import Reducer, { defaultReducerValue } from './Reducer';

import Styles from './Styles';

const ItemForm = () => {
  const location = useLocation();
  const itemsCollection = useCollection('items');
  const intl = React.useContext(IntlContext);

  const constraints = {
    name: {
      presence: {
        allowEmpty: false,
        message: intl.t('form.error.missing.name'),
      },
    },
    desc: {
      presence: {
        allowEmpty: false,
        message: intl.t('form.error.missing.desc'),
      },
    },
    price: {
      presence: {
        allowEmpty: false,
        message: intl.t('form.error.missing.price'),
      },
      format: {
        pattern: /\d/,
        message: intl.t('form.error.invalid.price'),
      },
    },
    image: {
      presence: {
        allowEmpty: false,
        message: intl.t('form.error.missing.image'),
      },
    },
  };

  const [
    { name, desc, addLocation, image, addItemFormVisible, price },
    dispatch,
  ] = React.useReducer(Reducer, defaultReducerValue);
  const [errors, setErrors] = React.useState({});

  const setName = React.useCallback((pName) => dispatch({ type: 'UPDATE_NAME', name: pName }), []);
  const setDesc = React.useCallback((pDesc) => dispatch({ type: 'UPDATE_DESC', desc: pDesc }), []);
  const setPrice = React.useCallback(
    (pPrice) => dispatch({ type: 'UPDATE_PRICE', price: pPrice }),
    []
  );
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
              {errors.image && <Text>{errors.image[0]}</Text>}
            </View>
            <FormInput label="item.name" value={name} returnKeyType="next" onChangeText={setName} />
            {errors.name && <Text>{errors.name[0]}</Text>}
            <FormInput label="item.desc" value={desc} returnKeyType="next" onChangeText={setDesc} />
            {errors.desc && <Text>{errors.desc[0]}</Text>}
            <FormInput
              label="item.price"
              value={price}
              returnKeyType="next"
              onChangeText={setPrice}
              keyboardType="numeric"
            />
            {errors.price && <Text>{errors.price[0]}</Text>}
            <Switch value={addLocation} onValueChange={setAddLocation} leftText="text.location" />
          </Dialog.Content>
          <Dialog.Actions style={Styles.dialogActionsButtons}>
            <ButtonIntl title="button.cancel" uppercase onSubmit={CloseAddItemForm} />
            <FirebaseConsumer>
              {(firebase) => (
                <FormButton
                  title="addItem"
                  uppercase
                  constraints={{ fields: { name, desc, price, image }, rules: constraints }}
                  onError={setErrors}
                  onSubmit={() => {
                    const item = {
                      name,
                      desc,
                      email: firebase.user.email,
                      userId: firebase.user.uid,
                      sold: false,
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
