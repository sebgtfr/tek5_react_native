import React from 'react';
import PropTypes from 'prop-types';

import { TouchableOpacity } from 'react-native';
import { Portal, Dialog, IconButton, Colors } from 'react-native-paper';

import Avatar from '../../../utils/Avatar';

import useImage from '../../../../hooks/useImage';

const FormAvatar = ({ src, size, type, onChange, square }) => {
  const { image, pickImageFromGallery, pickImageFromCamera } = useImage(type);
  const [visible, setVisible] = React.useState(false);

  const show = React.useCallback(() => setVisible(true), [setVisible]);
  const hide = React.useCallback(() => setVisible(false), [setVisible]);

  React.useEffect(() => {
    if (image !== null && onChange) {
      onChange(image);
      hide();
    }
  }, [image, onChange, hide]);

  return (
    <>
      <TouchableOpacity onPress={show}>
        <Avatar src={src || image} size={size} square={square} />
      </TouchableOpacity>
      <Portal>
        <Dialog visible={visible} onDismiss={hide}>
          <Dialog.Content style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <IconButton
              icon="folder"
              size={64}
              color={Colors.deepPurple900}
              onPress={pickImageFromGallery}
            />
            <IconButton
              icon="camera"
              size={64}
              color={Colors.deepPurple900}
              onPress={pickImageFromCamera}
            />
          </Dialog.Content>
        </Dialog>
      </Portal>
    </>
  );
};

FormAvatar.propTypes = {
  src: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      uri: PropTypes.string.isRequired,
    }),
  ]),
  type: PropTypes.string.isRequired,
  size: PropTypes.number,
  onChange: PropTypes.func,
  square: PropTypes.bool,
};

FormAvatar.defaultProps = {
  src: undefined,
  size: undefined,
  onChange: undefined,
  square: false,
};

export default FormAvatar;
