import { useRoute } from '@react-navigation/native';
import { View, SafeAreaView, Text, TextInput, Button, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from './styles';
import { firebase } from "../../firebase/config";
import Header from '../../components/Header/Header';
import SenderMessage from '../../components/SenderMessage/SenderMessage';
import ReceiverMessage from '../../components/ReceiverMessage/ReceiverMessage';
import getMatchedUserInfo from '../../../lib/getMatchedUserInfo';
import { onSnapshot, serverTimestamp, query, collection, orderBy } from 'firebase/firestore';


export default function MessageScreen() {
    const user = firebase.auth().currentUser;
    const { params } = useRoute();
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);

    const { matchDetails } = params;

    useEffect(() => {
        // console.log(user.uid)
        // console.log(matchDetails.id)
        let query = firebase.firestore().collection("matches")
        // query = query.where("matches", 'array-contains', matchDetails.id)
        onSnapshot(query, async(snapshot) => {
            snapshot.docs.forEach(match => {
                if(match.id === matchDetails.id){
                    let tabMessage = match.data().messages;
                    console.log(tabMessage.userId);
                    setMessages(messages => [...messages, tabMessage])
                    // setMessages({
                    //     id: tabMessage.userId,
                    //     ...tabMessage
                    // })
                    console.log(messages);
                    // console.log(messages);
                    // setMessages(
                    //     match.data().messages.map(doc => ({
                    //         id: doc.id,
                    //         ...doc.data()
                    //     }))
                    // );
                    
                }
            })
        })

        // onSnapshot(firebase.firestore().collection("matches"), 
        // (snapshot) => {
        //      console.log(snapshot.docs)
        // })


        

        // onSnapshot(
        //     query(
        //         collection(firebase.firestore(), "matches", matchDetails.id, "messages")
        //         // .orderBy("timestamp", "desc")
        //     ),
        //     (snapshot) => {
        //         console.log(snapshot.docs)
        //     snapshot.docs.map(doc => {
        //         console.log(doc.data())
        //     })
        //     //     setMessages(snapshot.docs.map(doc => (
        //     //     {
        //     //     id: doc.id,
        //     //     ...doc.data()
        //     // })
        //     // ))
        //     }
        // )
    }, [matchDetails, firebase.firestore()])

    const sendMessage = () => {
        firebase.firestore().collection('matches')
            .doc(matchDetails.id)
            .set({
                messages: {
                    timestamp: serverTimestamp(),
                    userId: user.uid,
                    fullName: matchDetails.users[user.uid].fullName,
                    photo: matchDetails.users[user.uid].image,
                    message: input,
                }
            }, { merge: true })

        setInput("");
    };

    return (
        <SafeAreaView>
            <Header title={getMatchedUserInfo(matchDetails?.users, user.uid).fullName} />
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={10}
            >
                { messages != undefined ? 
                                <SenderMessage key={'0'} message={messages} />
                    : <Text>j'ai pas</Text>
                }
                {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <FlatList
                        data={messages}
                        keyExtractor={item => item.id}
                        renderItem={({ item: message }) =>
                            message.userId === user.uid ? (
                                <SenderMessage key={message.id} messages={message} />
                            ) : (
                                <ReceiverMessage key={message.id} messages={message} />
                            )
                        }
                    />
                </TouchableWithoutFeedback> */}
            </KeyboardAvoidingView>

            <View>
                <TextInput
                    placeholder="Envoyer un message..."
                    onChangeText={setInput}
                    onSubmitEditing={sendMessage}
                    value={input}
                />
                <Button onPress={sendMessage} title="Envoyer" />
            </View>
        </SafeAreaView>
    )
}