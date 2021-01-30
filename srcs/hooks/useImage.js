import React from 'react';
import * as ImagePicker from 'expo-image-picker';
//import { result } from 'validate.js';

const useImage = (type, methode) => {
  const [image, setImage] = React.useState(null);
  const pickImage = React.useCallback(
    async (methode) => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
          return;
        }
        if (methode === false) {
          const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            base64: true,
            quality: 0.4,
          });
          if (!result.cancelled) {
            setImage(type == 'uri' ? result.uri : result.base64);
          }
        } else {
          const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            base64: true,
            quality: 0.4,
          });
          if (!result.cancelled) {
            setImage(type == 'uri' ? result.uri : result.base64);
          }
        }
      }
    },
    [setImage]
  );
  return React.useMemo(() => ({ image, pickImage }), [image, pickImage]);
};

export default useImage;
