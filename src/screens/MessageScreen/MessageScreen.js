import { useRoute } from '@react-navigation/native';
import { View, SafeAreaView, Text, TextInput, Button, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from './styles';
import { firebase } from "../../firebase/config";
import Header from '../../components/Header/Header';
import SenderMessage from '../../components/SenderMessage/SenderMessage';
import ReceiverMessage from '../../components/ReceiverMessage/ReceiverMessage';
import getMatchedUserInfo from '../../../lib/getMatchedUserInfo';
import { onSnapshot, serverTimestamp, query, collection, orderBy, addDoc } from 'firebase/firestore';


export default function MessageScreen() {
    const user = firebase.auth().currentUser;
    const { params } = useRoute();
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);

    const { matchDetails } = params;



    useEffect(() => {
        onSnapshot(
            query(
                collection(firebase.firestore(), 'matches', matchDetails.id, "messages"),
                orderBy("timestamp", "desc")
            ), snapshot => {
                setMessages(snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })))
            }
        )
    }, [matchDetails, firebase.firestore()])

    const sendMessage = () => {
        addDoc(collection(firebase.firestore(), 'matches', matchDetails.id, 'messages'), {
            timestamp: serverTimestamp(),
            userId: user.uid,
            fullName: matchDetails.users[user.uid].fullName,
            photo: matchDetails.users[user.uid].image,
            message: input,
        })
        setInput("");

        const matchId = matchDetails.id;

        firebase.firestore()
            .collection("matches")
            .doc(matchId)
            .get()
            .then((doc) => {
                if (doc.exists) {
                    const matchData = doc.data();
                    const startChat = matchData.startChat;

                    if (!startChat) {
                        firebase.firestore()
                            .collection("matches")
                            .doc(matchId)
                            .update({ startChat: true })
                            .then(() => {
                                console.log("Champ startChat mis à jour avec succès !");
                            })
                            .catch((error) => {
                                console.log("Erreur lors de la mise à jour du champ startChat :", error);
                            });
                    } else {
                        console.log("Le champ startChat est déjà à true.");
                    }
                } else {
                    console.log("Le document correspondant à matchId n'existe pas.");
                }
            })
            .catch((error) => {
                console.log("Erreur lors de la récupération des données :", error);
            });

    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header title={getMatchedUserInfo(matchDetails?.users, user.uid).fullName} />
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={10}
                style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', }} enabled
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <FlatList
                        data={messages}
                        inverted={-1}
                        keyExtractor={item => item.id}
                        renderItem={({ item: message }) =>
                            message.userId === user.uid ? (
                                <SenderMessage key={message.id} message={message} />
                            ) : (
                                <ReceiverMessage key={message.id} message={message} />
                            )
                        }
                    />
                </TouchableWithoutFeedback>

                <View style={{ backgroundColor: '#fff', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
                    <TextInput
                        placeholder="Envoyer un message..."
                        onChangeText={setInput}
                        onSubmitEditing={sendMessage}
                        value={input}
                        style={{ width: '70%' }}
                    />
                    <Button onPress={sendMessage} title="Envoyer" />
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}