import { Text, View, Image, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native'
import React, { Fragment, useEffect, useState } from 'react'
import styles from './styles';
import { firebase } from "../../firebase/config";
// import { onSnapshot } from "firebase/firestore";
import ChatList from '../../components/ChatList/ChatList';
import { useNavigation } from '@react-navigation/native';
import MenuComponents from "../../components/MenuComponents/MenuComponents";


export default function ChatScreen() {
    const user = firebase.auth().currentUser;
    const navigation = useNavigation();

    return (
        <Fragment>
            <SafeAreaView style={{ flex:0, backgroundColor: '#161241' }} />
            <SafeAreaView style={{flex: 1}}>
                <View style={styles.container}>
                    <View style={styles.background}></View>
                    <View style={styles.startChat}>
                        <View style={styles.startChatContainer}>
                            <Text style={styles.startChat}>Vos conversations</Text>
                        </View>
                    </View>
                    <View style={styles.chatsContainer}>
                        <ChatList startNewChat={false}/>
                    </View>
                </View>
            </SafeAreaView>
            <SafeAreaView style={{ flex: 0, backgroundColor: '#161241' }} >
                <MenuComponents navigation={navigation}/>
            </SafeAreaView>
        </Fragment>
    )
}