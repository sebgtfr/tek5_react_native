import React from 'react';

import { Button, Portal, Dialog, TextInput, RadioButton, Text } from 'react-native-paper';

import { ButtonIntl, TextIntl, PIntl } from '../../intl';

import useCollection from '../../../hooks/useCollection';

import { FirebaseConsumer, FirebaseContext } from '../../../providers/FirebaseProvider';
import useImage from '../../../hooks/useImage';

const ItemForm = () => {
  const [name, setName] = React.useState('Name');
  const [desc, setDesc] = React.useState('Description');
  const [latitude, setLatitude] = React.useState(false);
  const [longitude, setLongitude] = React.useState(false);
  const [isDialogVisible, setIsDialogVisible] = React.useState(false);
  const [checked, setChecked] = React.useState('oui');
  const { image, pickImage } = useImage('');
  const [methodeChecked, setMethodeChecked] = React.useState(false);
  const firebase = React.useContext(FirebaseContext);

  React.useEffect(() => {
    (async () => {
      const { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
      } else {
        const location = await Location.getCurrentPositionAsync({});
        setLatitude(location.coords.latitude);
        setLongitude(location.coords.longitude);
      }
    })();
  }, []);

  React.useEffect(() => {
    if (image !== null) {
      if (longitude && checked == 'oui') {
        useCollection('items')
          .doc()
          .set({
            name,
            desc,
            latitude,
            longitude,
            email: firebase.user.email,
            id: firebase.user.uid,
            photoURL: { uri: image },
          });
      } else {
        useCollection('items')
          .doc()
          .set({
            name,
            desc,
            email: firebase.user.email,
            id: firebase.user.uid,
            photoURL: { uri: image },
          });
        console.log(image);
      }
      setName('Name');
      setDesc('Description');
      setMethodeChecked(false);
    }
  }, [image]);

  return (
    <>
      <Button
        mode="contained"
        onPress={(_) => {
          setIsDialogVisible(true);
        }}
      >
        <Portal>
          <Dialog visible={isDialogVisible} onDismiss={() => setIsDialogVisible(false)}>
            <Dialog.Title>add item</Dialog.Title>
            <Dialog.Content>
              <TextInput value={name} onChangeText={(text) => setName(text)} />
              <TextInput value={desc} onChangeText={(text) => setDesc(text)} />
              <Dialog.Title>Localisation</Dialog.Title>
              <Text>oui</Text>
              <RadioButton
                value="oui"
                status={checked === 'oui' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('oui')}
              />
              <Text>non</Text>
              <RadioButton
                value="non"
                status={checked === 'non' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('non')}
              />
              <Dialog.Title>Choose methode</Dialog.Title>
              <Text>take picture from camera</Text>
              <RadioButton
                value="true"
                status={methodeChecked === true ? 'checked' : 'unchecked'}
                onPress={() => setMethodeChecked(true)}
              />
              <Text>take picture from gallery</Text>
              <RadioButton
                value="false"
                status={methodeChecked === false ? 'checked' : 'unchecked'}
                onPress={() => setMethodeChecked(false)}
              />
            </Dialog.Content>
            <Dialog.Actions>
              <Button
                onPress={() => {
                  setName('Name');
                  setDesc('Description');
                  setMethodeChecked(false);
                  setIsDialogVisible(false);
                }}
              >
                Cancel
              </Button>
              <Button
                onPress={() => {
                  pickImage(methodeChecked);
                  setIsDialogVisible(false);
                }}
              >
                Submit
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
        Add item
      </Button>
    </>
  );
};

ItemForm.propTypes = {};

export default ItemForm;
