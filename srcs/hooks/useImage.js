import React from 'react';
import { Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const useImage = (type) => {
  const [image, setImage] = React.useState(null);

  const options = React.useMemo(
    () => ({
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
      quality: 0,
    }),
    []
  );

  const pickImage = React.useCallback(
    (methode) =>
      (Platform.OS !== 'web'
        ? ImagePicker.requestMediaLibraryPermissionsAsync()
        : Promise.resolve({ status: 'granted' })
      )
        .then(({ status }) => (status === 'granted' ? Promise.resolve() : Promise.reject()))
        .then(() =>
          methode
            ? ImagePicker.launchCameraAsync({
                ...options,
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
              })
            : ImagePicker.launchImageLibraryAsync({
                ...options,
                mediaTypes: ImagePicker.MediaTypeOptions.All,
              })
        )
        .then((result) => {
          if (!result.cancelled) {
            const { uri, base64 } = result;
            const base64Img = `data:image/jpeg;base64,${base64}`;

            setImage(type === 'uri' ? uri : base64Img);
          }
        })
        .catch(),
    [options, type]
  );

  const pickImageFromGallery = React.useCallback(() => pickImage(false), [pickImage]);
  const pickImageFromCamera = React.useCallback(() => pickImage(true), [pickImage]);

  return React.useMemo(() => ({ image, pickImage, pickImageFromGallery, pickImageFromCamera }), [
    image,
    pickImage,
    pickImageFromGallery,
    pickImageFromCamera,
  ]);
};

export default useImage;
