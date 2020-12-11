import React from 'react';

import {
    Text,
    View,
    TouchableOpacity,
} from 'react-native';

import Intl from '../../configs/Intl';

import SignInForm from '../../components/forms/SignInForm';

import Styles from './Styles';

const SignIn = ({ navigation }) =>
(
    <View style={Styles.container}>
        <SignInForm />
        <TouchableOpacity
            onPress={() => navigation.navigate('SignUp')}
        >
            <Text>{Intl.t('signUp')}</Text>
        </TouchableOpacity>
    </View>
);

export default SignIn;
