import React from 'react';

import useCollection from '../../../hooks/useCollection';

import {
  Title,
  Button,
  Provider,
  Portal,
  Dialog,
  TextInput,
  RadioButton,
  Text,
} from 'react-native-paper';

import * as Location from 'expo-location';

import { FirebaseConsumer } from '../../../providers/FirebaseProvider';


const ItemForm = () => {
  const [name, setName] = React.useState('Name');
  const [desc, setDesc] = React.useState('Description');
  const [latitude, setLatitude] = React.useState(false);
  const [longitude, setLongitude] = React.useState(false);
  const [isDialogVisible, setIsDialogVisible] = React.useState(false);
  const [checked, setChecked] = React.useState('oui');
  
  React.useEffect(() => {
    
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      } else {

      let location = await Location.getCurrentPositionAsync({});
      setLatitude(location.coords.latitude)
      setLongitude(location.coords.longitude)
      }
    })();
  }, []);


  return (
    <Provider>
    <Button
      mode="contained"
      onPress={(_) => {
      setIsDialogVisible(true);
      }}>
      <Portal>
        <Dialog
          visible={isDialogVisible}
          onDismiss={() => setIsDialogVisible(false)}>
          <Dialog.Title>add item</Dialog.Title>
          <Dialog.Content>
            <TextInput
              value={name}
              onChangeText={(text) => setName(text)}
            />
            <TextInput
              value={desc}
              onChangeText={(text) => setDesc(text)}
            />
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
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              onPress={() => {
                setName('Name');
                setDesc('Description');
                setIsDialogVisible(false);
              }}>
              Cancel
            </Button>
            <FirebaseConsumer>
      {(firebase) => (
        <>
        <Button
              onPress={() => {
                setName('Name');
                setDesc('Description');
                setIsDialogVisible(false);
                if (longitude && checked == "oui") {
                  useCollection('items').doc().set({ name, desc, latitude, longitude, email: firebase.user.email, id: firebase.user.uid })
                } else {
                  useCollection('items').doc().set({ name, desc, email: firebase.user.email, id: firebase.user.uid })
                }
                
              }}>
              Submit
            </Button>
        </>
      )}
    </FirebaseConsumer>
            
            </Dialog.Actions>
          </Dialog>
        </Portal>
      Add item
    </Button>
  </Provider>
)};

ItemForm.propTypes = {};

export default ItemForm;
