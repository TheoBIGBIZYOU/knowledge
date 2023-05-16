import { Text, View, Image, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './styles';
import { firebase } from "../../firebase/config";
import { onSnapshot } from "firebase/firestore";
import ChatList from '../components/ChatList/ChatList';

export default function ChatScreen({ navigation, props }) {
    const [userRole, setUserRole] = useState('');
    const [imageUrl, setImageUrl] = useState([]);
    const [newChatUser, setNewChatUser] = useState([]);
    const user = firebase.auth().currentUser;

    useEffect(() => {
        onSnapshot(firebase.firestore().collection("users").where("id", "==", user.uid), (snapshot) => {
            snapshot.docs.forEach(user => {
                setUserRole(user.data().role);
                
                let query = firebase.firestore().collection("users")
                if(user.data().role === 'newbie') {
                    query = query.where("role", "==", "mentor")
                } else {
                    query = query.where("role", "==", "newbie")
                }
                query = query.where("matches", 'array-contains', user.data().id)
                query = query.where("startChat", '==', false)

                onSnapshot(query, (snapshot) => {
                    let chatUser = [];
                    let resultsImage = [];
                    snapshot.docs.forEach(async (user, i) => {
                        chatUser.push(user.data());
                        const url = await firebase.storage()
                            .ref('/' + snapshot.docs[i].data().image) //name in storage in firebase console
                            .getDownloadURL()
                        resultsImage.push(url)
                        setImageUrl(resultsImage);
                    })
                    setNewChatUser(chatUser);
                })
            })
        })

    }, []);

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <View style={styles.background}></View>
                <View style={styles.startChat}>
                    <Text style={styles.title}>Messages</Text>
                    <View style={styles.startChatContainer}>
                        <Text style={styles.startChat}>Démarrer une conversation</Text>
                    </View>
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.chatContainer}
                    >
                        {
                            newChatUser.length > 0 ?
                                newChatUser.map((item, index) => {
                                    console.log(imageUrl);
                                    return (
                                        <TouchableOpacity
                                            key={index}
                                            style={styles.btnStartChat}
                                        >
                                            <Image
                                                style={styles.userImage}
                                                source={{ uri: imageUrl[index] }}
                                            />
                                            <Text style={styles.userName}>{item.fullName}</Text>
                                        </TouchableOpacity>
                                    )
                                })
                                : <Text style={styles.descriptionText}>Aucun chat disponible</Text>
                        }
                    </ScrollView>
                </View>
                <View style={styles.chatsContainer}>
                    <ChatList image={'https://cdn.smehost.net/sonymusicfr-frprod/wp-content/uploads/2022/02/Vald.jpeg'} name={'Yann'} message={'As-tu réussi à te débloquer avec nos précédents échanges ?'} />
                </View>
            </View>

        </SafeAreaView>
    )
}