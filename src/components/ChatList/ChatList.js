import React, { useEffect, useState } from 'react'
import { Text, View, Image } from 'react-native'
import styles from './styles';
import { firebase } from "../../firebase/config";
import { onSnapshot } from 'firebase/firestore';

export default function ChatList(props) {
    const [matches, setMatches] = useState([]);
    const user = firebase.auth().currentUser;

    useEffect(() => {
        onSnapshot(
          firebase
            .firestore()
            .collection("matches")
            .where("usersMatches", "array-contains", user.uid)
        ),
        (snapshot) => {
          setMatches(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          );
        }
      }, []);
      

    return (
        <View style={[styles.cardChat, styles.cardShadow]}>
            <View style={styles.cardChatLeft}>
                <Image
                    style={styles.cardChatUserImage}
                    source={{ uri: 'https://cdn.smehost.net/sonymusicfr-frprod/wp-content/uploads/2022/02/Vald.jpeg' }}
                />
            </View>
            <View style={styles.cardChatRight}>
                <Text style={styles.cardChatName}>{props.name}</Text>
                <Text style={styles.cardChatMessage}>{props.message}</Text>
            </View>
        </View>
    )
}