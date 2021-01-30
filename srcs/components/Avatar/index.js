import React from 'react';
import {Image, View} from 'react-native';
import { FirebaseConsumer } from '../../providers/FirebaseProvider';
import useCollection from '../../hooks/useCollection';
import {useFocusEffect} from '@react-navigation/native';
import Styles from "./Styles";

const Avatar = ({id}) => {

  const [image, setImage] = React.useState(false);

  useCollection('users').doc(id).get().then((querySnapshot) => {
    setImage(querySnapshot.data().photoURL);
  })
  return (    
    
    <Image
      style = {Styles.userAvatar}
      source={image == null ? require('../../images/defaultAvatar.png') : {uri: image}}
      />  
    )}
    

export default Avatar;
