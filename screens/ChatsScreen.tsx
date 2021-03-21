import * as React from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import ChatListItem from '../components/ChatListItem';
import ChatRooms from '../data/ChatRooms'
import { FlatList } from 'react-native-gesture-handler';
import NewMessageButton from '../components/NewMessageButton';



export default function ChatsScreen() {
  return (
    <View style={styles.container}>
      <FlatList 
        data={ChatRooms}
        renderItem={({item})=> <ChatListItem chatRoom={item}/>}
        keyExtractor={(item)=>item.id}
        style={{width:'100%'}}
      />
      <NewMessageButton />
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
