import React, { Component } from 'react'
import { View, Text ,Image} from 'react-native';
import { User } from '../../types';
import styles from './style'
import moment from 'moment'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';


export type ContactListItemProps ={
    user:User;
}

const ContactListItem = (props: ContactListItemProps) => {
    const{user} = props;

    const navigation = useNavigation();

    const onCLick = () =>{
        
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
