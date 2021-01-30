import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';


import { FirebaseConsumer } from '../../providers/FirebaseProvider';

import { TextIntl, ButtonIntl } from '../../components/intl';

import useCollection from '../../hooks/useCollection';

import Avatar from '../../components/Avatar';

import Styles from './Styles';

import * as ImagePicker from 'expo-image-picker';


const Profile = () => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async (id) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
      quality: 0,
    });

//    console.log(result);

    if (!result.cancelled) {
      let tmp ='data:image/jpeg;base64,' + result.base64 
      setImage(tmp);
      useCollection('users').doc(id).update({"photoURL": image})
      console.log(id)
    }
  };

  return (
  <View style={Styles.container}>
    <FirebaseConsumer>
      {(firebase) => (
        <>
          <TouchableOpacity
            onPress={(_) => {
              pickImage(firebase.user.uid)
            }}>
            <Avatar id={firebase.user.uid}/>
          </TouchableOpacity>

          {firebase.user.displayName && <Text>{firebase.user.displayName}</Text>}
          <Text>{firebase.user.email}</Text>
          <ButtonIntl id="signOut" onPress={() => firebase.signOut()} />
        </>
      )}
    </FirebaseConsumer>
  </View>
);
          }
Profile.propTypes = {};

export default Profile;
//useCollection('users').doc(firebase.user.uid).update({photoURL: pickImage()})