import React from 'react';
import { Text, View, FlatList, Image } from 'react-native';

import Styles from './Styles';

import ItemForm from '../../components/forms/ItemForm';
import FormList from '../../components/forms/utils/FormList';
import useCollection from '../../hooks/useCollection';
import { useFocusEffect } from '@react-navigation/native';
import { FirebaseContext } from '../../providers/FirebaseProvider';
import { ButtonIntl } from '../../components/intl';

const MyItems = () => {
  const [soldItems, setSoldItems] = React.useState(false);
  const [notSoldItems, setNotSoldItems] = React.useState(false);
  const [sold, setSold] = React.useState(false);
  const firebase = React.useContext(FirebaseContext);

  useFocusEffect(
    React.useCallback(() => {
      let soldItems = [];
      let notSoldItems = [];
      useCollection('items')
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            let tmp = {};
            tmp = doc.data();
            tmp._id = doc.id;
            if (tmp.id == firebase.user.uid) {
              if (tmp.sold) {
                soldItems.push(tmp);
              } else {
                notSoldItems.push(tmp);
              }
            }
          });
          setSoldItems(soldItems);
          setNotSoldItems(notSoldItems);
        });
    }, [])
  );

  return (
    <View style={Styles.container}>
      <View style={{ flexDirection: 'row' }}>
        <ButtonIntl uppercase title="button.notSold" onSubmit={() => setSold(false)} />
        <ButtonIntl uppercase title="button.sold" onSubmit={() => setSold(true)} />
      </View>
      <ItemForm />
      <Text>Item List</Text>
      <FormList items={sold ? soldItems : notSoldItems} myItems={true} />
    </View>
  );
};

MyItems.propTypes = {};

export default MyItems;
