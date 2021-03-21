import * as React from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import ChatListItem from '../components/ChatListItem';
import users from '../data/Users'
import { FlatList } from 'react-native-gesture-handler';
import ContactListItem from '../components/ContactListItem';



export default function ContactsScreen() {
  return (
    <View style={styles.container}>
      <FlatList 
        data={users}
        renderItem={({item})=> <ContactListItem user={item}/>}
        keyExtractor={(item)=>item.id}
        style={{width:'100%'}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  
  },
});
