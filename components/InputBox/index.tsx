import React, { Component, useState, useEffect } from 'react'
import { Text, View } from 'react-native';
import styles from './styles'
import { MaterialCommunityIcons, FontAwesome5, Entypo, Fontisto, MaterialIcons } from '@expo/vector-icons';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import {createMessage, updateChatRoom} from '../../src/graphql/mutations'
const InputBox = (props: { chatRoomID: any; }) => {
    const { chatRoomID} = props;
    
    const [message, setMessage] = useState('');
    const [myUserId, setMyUserId] =  useState(null)
    useEffect(()=>{
        const fetchUser = async () =>{
            const userInfo = await Auth.currentAuthenticatedUser();
            setMyUserId(userInfo.attributes.sub);
        }
        fetchUser();
    })

    const onMicrophonePress =()=>{
        console.warn("microphones")
    }

    const updateChatRoomLastMessage = async (messageId:String) =>{
        try {
            await API.graphql(graphqlOperation(updateChatRoom,{
                input:{
                    id:chatRoomID,
                    lastMessageID:messageId
                }
            }))
        } catch (error) {
            console.log(error)
        }
    }

    const onSendPress = async ()=>{
        
        

        try {
           const newMessageData = await API.graphql(graphqlOperation(createMessage, {
                input:{
                    content:message,
                    userID: myUserId,
                    chatRoomID
                }
            }))
            await updateChatRoomLastMessage(newMessageData.data.createMessage.id)
        } catch (error) {
            console.log(error)
        }

        setMessage('');
    }
    
    const onPress =()=>{
        if(!message){
            onMicrophonePress();
        }else{
            onSendPress();
        }
    }
        return (
            <View style={styles.container}>
                <View style={styles.mainContainer}>
                    <FontAwesome5 name="laugh-beam" size={24} color={"grey"} />
                    <TextInput 
                        style={styles.textInput}
                        multiline
                        value={message}
                        onChangeText={setMessage}
                        />
                    <Entypo name="attachment" size={24} color={"grey"} style={styles.icon}/>
                    {!message && <Fontisto name="camera" size={24} color={"grey"} style={styles.icon}/>}
                </View>
                <TouchableOpacity onPress={onPress}>
                    <View style={styles.buttonContainer}>
                        {!message 
                            ? <MaterialCommunityIcons name="microphone" size={28} color={"white"} />
                            : <MaterialIcons name="send" size={28} color={"white"} />  
                        }
                    </View>
                </TouchableOpacity>
            </View>
        )
}
export default InputBox;