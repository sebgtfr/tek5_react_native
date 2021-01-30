import React from 'react';
import * as ImagePicker from 'expo-image-picker';

const useImage = (type) => {
  const [image, setImage] = React.useState(null);
  const pickImage = React.useCallback(async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
        return;
      }
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        base64: true,
        quality: 0,
      });
      if (!result.cancelled) {
        setImage(type == 'uri' ? result.uri : result.base64);
      }
    }
  }, [setImage]);
  return React.useMemo(() => ({ image, pickImage }), [image, pickImage]);
};

export default useImage;
