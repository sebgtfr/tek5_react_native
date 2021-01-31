import React from 'react';
import PropTypes from 'prop-types';

import { View } from 'react-native';
import { Text, IconButton } from 'react-native-paper';
import { validate } from 'validate.js';

import { IntlContext } from '../../../providers/IntlProvider';

import { FormInput } from '../../forms/utils';

import Styles from './Styles';

const TextEdit = ({ label, value, constraints, onSubmit, missingLabel }) => {
  const intl = React.useContext(IntlContext);

  const [editMode, setEditMode] = React.useState(false);
  const [text, setText] = React.useState(value);
  const [error, setError] = React.useState(null);

  const editModeOn = React.useCallback(() => setEditMode(true), []);
  const editModeOff = React.useCallback(() => setEditMode(false), []);

  React.useEffect(() => {
    if (editMode) {
      setText(value);
      setError(null);
    }
  }, [value, editMode]);

  return (
    value && (
      <>
        <View style={Styles.container}>
          {editMode ? (
            <>
              <FormInput label={label} value={text} onChangeText={setText} />
              <IconButton
                icon="check-decagram"
                size={16}
                onPress={() => {
                  const validatedErrors = validate(
                    { text },
                    {
                      text: {
                        ...constraints,
                        presence: {
                          allowEmpty: false,
                          message: intl.t(`form.error.missing.${missingLabel}`),
                        },
                      },
                    },
                    { fullMessages: false }
                  );

                  setError((validatedErrors && validatedErrors.text[0]) || null);
                  if (validatedErrors === undefined) {
                    const ret = onSubmit(text);

                    if (ret instanceof Promise) {
                      ret.then(editModeOff).catch(editModeOff);
                    } else {
                      editModeOff();
                    }
                  }
                }}
              />
              <IconButton icon="close-octagon" size={16} onPress={editModeOff} />
            </>
          ) : (
            <>
              <Text style={Styles.text}>{value}</Text>
              <IconButton icon="pencil" size={16} onPress={editModeOn} />
            </>
          )}
        </View>
        {editMode && error && <Text>{error}</Text>}
      </>
    )
  );
};

TextEdit.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  constraints: PropTypes.shape(),
  missingLabel: PropTypes.string.isRequired,
};

TextEdit.defaultProps = {
  value: null,
  constraints: {},
};

export default TextEdit;
