import * as React from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import ChatListItem from '../components/ChatListItem';
import users from '../data/Users'
import { FlatList } from 'react-native-gesture-handler';
import ContactListItem from '../components/ContactListItem';
import { useEffect, useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { listUsers } from '../src/graphql/queries';



export default function ContactsScreen() {
  const [users, setUsers] = useState([])

  useEffect(()=>{
    const fetchUsers = async () =>{
      try {
        const usersData = await API.graphql(graphqlOperation(listUsers))
        setUsers(usersData.data.listUsers.items);
      } catch (error) {
        console.log(error)
      }
      
    }
    fetchUsers();
  },[])
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
