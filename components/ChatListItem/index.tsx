import React, { Component, useEffect, useState } from 'react'
import { View, Text ,Image} from 'react-native';
import {ChatRoom } from '../../types';
import styles from './style'
import moment from 'moment'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { Auth } from 'aws-amplify';


export type ChatListItemProps ={
    chatRoom:ChatRoom;
}

const ChatListItem = (props: ChatListItemProps) => {
    const{chatRoom} = props;
    const [otherUser, setOtherUser] = useState(null);
    

    useEffect(()=>{
        const getOtherUser = async () =>{
            const userInfo = await Auth.currentAuthenticatedUser();
            
            console.log("chatroom: ",chatRoom.chatRoomUsers.items.length); 
            for (var i = 0; i <= chatRoom.chatRoomUsers.items.length; i++) {
                if(chatRoom.chatRoomUsers.items[i].user.id != userInfo.attributes.sub){
                    setOtherUser(chatRoom.chatRoomUsers.items[i].user);
                }
              }
            
/* 
           if(chatRoom.chatRoomUsers.items[0].user.id === userInfo.attributes.sub){
                setOtherUser(chatRoom.chatRoomUsers.items[1].user);
            }else{
                setOtherUser(chatRoom.chatRoomUsers.items[0].user);
            }
            console.log("chatroom: ",chatRoom);*/
        }
        getOtherUser()
    },[])
    const navigation = useNavigation();

    const onCLick = () =>{
        navigation.navigate('ChatRoom',{
            id:chatRoom.id,
            name:otherUser.name})
    }

    if(!otherUser){
        return null;
    }
        return (
            <TouchableWithoutFeedback onPress={onCLick} >
            <View style={styles.container}>
                <View style={styles.leftContainer}>
                    <Image source={{uri:otherUser.imageUri}} style={styles.avatar}/>
                    <View style={styles.midContainer}>
                        <Text style={styles.username}>{otherUser.name}</Text>
                        <Text numberOfLines={2} style={styles.lastMessage}>{chatRoom.lastMessage ? chatRoom.lastMessage.content:""}</Text>
                    </View>
                </View>
                <Text  style={styles.time}>{ chatRoom.lastMessage && moment(chatRoom.lastMessage.createdAt).format("DD/MM/YYYY")}</Text>
            </View>
            </TouchableWithoutFeedback>
        )
};
export default ChatListItem;
