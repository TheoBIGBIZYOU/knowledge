import { Text, View, Image, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './styles';
import { firebase } from "../../firebase/config";
import { onSnapshot } from "firebase/firestore";

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
                query = query.where("role", "==", "mentor")
                query = query.where("matches", 'array-contains', user.data().id)

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
                    <Text style={styles.chatTitle}>Messages</Text>
                    <View style={styles.chatContainer}>
                        {
                            newChatUser.length > 0 ?
                                newChatUser.map((item, index) => {
                                    return (
                                        <TouchableOpacity key={item} style={styles.skillItem}>
                                            <Image
                                                style={styles.userImage}
                                                source={{ uri: imageUrl[index] }}
                                            />
                                            <Text>{item.fullName}</Text>
                                        </TouchableOpacity>
                                    )
                                })
                                : <Text style={styles.descriptionText}>Aucun chat disponible</Text>
                        }
                    </View>
                </View>

                {userRole === 'newbie' ? <Text style={styles.title}>Cherche ton mentor</Text> : <Text style={styles.title}>Choisis ton apprenti</Text>}
            </View>

        </SafeAreaView>
    )
}