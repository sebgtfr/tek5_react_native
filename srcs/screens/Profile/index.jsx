import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { FirebaseContext } from '../../providers/FirebaseProvider';

import { ButtonIntl } from '../../components/intl';

import useImage from '../../hooks/useImage';

import Avatar from '../../components/Avatar';

import Styles from './Styles';
import avatar from '../../images/defaultAvatar.png';

const Profile = () => {
  const firebase = React.useContext(FirebaseContext);

  const { image, pickImage } = useImage('uri');
  React.useEffect(() => {
    if (image !== null) firebase.edit({ photoURL: image });
  }, [image]);
  return (
    <View style={Styles.container}>
      <TouchableOpacity onPress={pickImage}>
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
