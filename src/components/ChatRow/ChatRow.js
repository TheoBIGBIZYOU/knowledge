import React, { useEffect, useState } from 'react'
import { Text, View, Image } from 'react-native'
import styles from './styles';
import { firebase } from "../../firebase/config";
import { TouchableOpacity } from 'react-native-gesture-handler';
import getMatchedUserInfo from '../../../lib/getMatchedUserInfo';
import { useNavigation } from '@react-navigation/native';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';

export default function ChatRow({ matchDetails }) {
    const navigation = useNavigation();
    const user = firebase.auth().currentUser;
    const [matchedUserInfo, setMatchedUserInfo] = useState(null);
    const [lastMessage, setLastMessage] = useState('');

    useEffect(() => {
        let resultsImage = []
        setMatchedUserInfo(getMatchedUserInfo(matchDetails.users, user.uid));
        // const url = firebase.storage()
        //     .ref('/' + matchedUserInfo.image) //name in storage in firebase console
        //     .getDownloadURL()
        // resultsImage.push(url);

        // setUrlImage(resultsImage);

    }, [matchDetails, user]);

    useEffect(() => onSnapshot(query(collection(firebase.firestore(),'matches', matchDetails.id, 'messages'), orderBy('timestamp', 'desc')
    ), snapshot => setLastMessage(snapshot.docs[0]?.data()?.message)
    ), [matchDetails, firebase.firestore()])



    return (
        <TouchableOpacity
            style={[styles.cardChat, styles.cardShadow]}
            onPress={() => navigation.navigate('Message', {matchDetails})}
        >
            <View style={styles.cardChatLeft}>
                {/* <Image
                    style={styles.cardChatUserImage}
                    source={{ uri: urlImage }}
                /> */}
            </View>
            <View style={styles.cardChatRight}>
                <Text style={styles.cardChatName}>{matchedUserInfo?.fullName}</Text>
                <Text style={styles.cardChatMessage}>{lastMessage || "Démarrer la conversation 👋"}</Text>
            </View>
        </TouchableOpacity>
    )
}