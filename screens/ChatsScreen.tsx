import * as React from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import ChatListItem from '../components/ChatListItem';
import ChatRooms from '../data/ChatRooms'
import { FlatList } from 'react-native-gesture-handler';
import NewMessageButton from '../components/NewMessageButton';
import { useEffect, useState } from 'react';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { getUser } from './queries';



export default function ChatsScreen() {

  const [chatRooms, setChatRooms] = useState([]);

  useEffect(()=>{
    const interval = setInterval(()=>{
      const fetchChatRooms = async () =>{
        try {
          const userInfo = await Auth.currentAuthenticatedUser();
  
          const userData = await API.graphql(graphqlOperation(getUser,{id:userInfo.attributes.sub,}))
          setChatRooms(userData.data.getUser.chatRoomUser.items)
        } catch (error) {
          console.log(error)
        }
      }
      fetchChatRooms();

    },2000);
    return () => clearInterval(interval);
    
  },[])

  return (
    <View style={styles.container}>
      <FlatList 
        data={chatRooms}
        renderItem={({item})=> <ChatListItem chatRoom={item.chatRoom}/>}
        keyExtractor={(item)=>item.id}
        style={{width:'100%'}}
        extraData={chatRooms}
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
