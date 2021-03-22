import React, { Component } from 'react'
import { View, Text ,Image} from 'react-native';
import { User } from '../../types';
import styles from './style'
import moment from 'moment'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { API, graphqlOperation ,Auth} from 'aws-amplify';
import { createChatRoom, createChatRoomUser } from '../../src/graphql/mutations';


export type ContactListItemProps ={
    user:User;
}

const ContactListItem = (props: ContactListItemProps) => {
    const{user} = props;

    const navigation = useNavigation();

    const onCLick = async () =>{
        try {
            const newChatRoomData = await API.graphql(graphqlOperation(createChatRoom,{
                input:{
                    lastMessageID:""
                }}));
            if(!newChatRoomData.data){
                console.log("failed to create a chat room");
                return;
            }
            const newChatRoom = newChatRoomData.data.createChatRoom;
            await API.graphql(graphqlOperation(createChatRoomUser,{input:{userID:user.id,chatRoomID: newChatRoom.id}}))

            const userInfo = await Auth.currentAuthenticatedUser();
            await API.graphql(graphqlOperation(createChatRoomUser,{input:{userID:userInfo.attributes.sub,chatRoomID: newChatRoom.id}}))

            navigation.navigate('ChatRoom',{
                id:newChatRoom.id,
                name:user.name
            })
        
        } catch (error) {
            console.log(error)
        }
    }
        return (
            <TouchableWithoutFeedback onPress={onCLick} >
            <View style={styles.container}>
                <View style={styles.leftContainer}>
                    <Image source={{uri:user.imageUri}} style={styles.avatar}/>
                    <View style={styles.midContainer}> 
                        <Text style={styles.username}>{user.name}</Text>
                        <Text numberOfLines={1} style={styles.status}>{user.status}</Text>
                    </View>
                </View>
            </View>
            </TouchableWithoutFeedback>
        )
};
export default ContactListItem;
