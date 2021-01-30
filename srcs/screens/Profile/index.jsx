import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { FirebaseContext } from '../../providers/FirebaseProvider';

import { ButtonIntl } from '../../components/intl';

import useImage from '../../hooks/useImage';

import Avatar from '../../components/Avatar';

import Styles from './Styles';
import avatar from '../../images/defaultAvatar.png';
import { Button, Portal, Dialog, TextInput, RadioButton } from 'react-native-paper';

const Profile = () => {
  const firebase = React.useContext(FirebaseContext);
  const { image, pickImage } = useImage('uri');
  const [checked, setChecked] = React.useState(false);
  const [isDialogVisible, setIsDialogVisible] = React.useState(false);

  React.useEffect(() => {
    if (image !== null) firebase.edit({ photoURL: image });
  }, [image]);
  return (
    <View style={Styles.container}>
      <TouchableOpacity onPress={() => setIsDialogVisible(true)}>
        <Portal>
          <Dialog visible={isDialogVisible} onDismiss={() => setIsDialogVisible(false)}>
            <Dialog.Title>Choose methode</Dialog.Title>
            <Dialog.Content>
              <Text>take picture from camera</Text>
              <RadioButton
                value="true"
                status={checked === true ? 'checked' : 'unchecked'}
                onPress={() => setChecked(true)}
              />
              <Text>take picture from gallery</Text>
              <RadioButton
                value="false"
                status={checked === false ? 'checked' : 'unchecked'}
                onPress={() => setChecked(false)}
              />
            </Dialog.Content>
            <Dialog.Actions>
              <Button
                onPress={() => {
                  setChecked(false);
                  setIsDialogVisible(false);
                }}
              >
                Cancel
              </Button>
              <Button
                onPress={() => {
                  setIsDialogVisible(false);
                  pickImage(checked);

                  setChecked(false);
                }}
              >
                Submit
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
        <Avatar src={firebase.user.photoURL ? { uri: firebase.user.photoURL } : avatar} />
      </TouchableOpacity>

      {firebase.user.displayName && <Text>{firebase.user.displayName}</Text>}
      <Text>{firebase.user.email}</Text>
      <ButtonIntl uppercase title="button.signOut" onSubmit={() => firebase.signOut()} />
    </View>
  );
};
Profile.propTypes = {};

export default Profile;

/*<TouchableOpacity onPress={pickImage}>
        <Avatar src={firebase.user.photoURL ? { uri: firebase.user.photoURL } : avatar} />
      </TouchableOpacity>*/
