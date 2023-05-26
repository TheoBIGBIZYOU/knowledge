import React, { useEffect, useState } from 'react'
import { Text, View, Image } from 'react-native'
import styles from './styles';
import { firebase } from "../../firebase/config";
import { TouchableOpacity } from 'react-native-gesture-handler';
import getMatchedUserInfo from '../../../lib/getMatchedUserInfo';
import { useNavigation } from '@react-navigation/native';
import { collection, onSnapshot, orderBy, query, storage } from 'firebase/firestore';

export default function ChatRow({ matchDetails }) {
    const navigation = useNavigation();
    const user = firebase.auth().currentUser;
    const [matchedUserInfo, setMatchedUserInfo] = useState(null);
    const [lastMessage, setLastMessage] = useState('');
    const [imageUrl, setImageUrl] = useState(null);
    const storage = firebase.storage();

    useEffect(() => {
          setMatchedUserInfo(getMatchedUserInfo(matchDetails.users, user.uid));
    }, [matchDetails, user]);

    useEffect(() => onSnapshot(query(collection(firebase.firestore(),'matches', matchDetails.id, 'messages'), orderBy('timestamp', 'desc')
    ), snapshot => setLastMessage(snapshot.docs[0]?.data()?.message)
    ), [matchDetails, firebase.firestore()])

    useEffect(() => {
        if (matchedUserInfo) {
          fetchImage();
        }
      }, [matchedUserInfo]);

    const fetchImage = async () => {
        try {
          const gsUrl = `gs://knowledge-cf905.appspot.com/${matchedUserInfo.image}`;
          const url = await storage.refFromURL(gsUrl).getDownloadURL();
          setImageUrl(url);
        } catch (error) {
          console.log('Erreur lors du chargement de l\'image :', error);
        }
    };

    return (
        <TouchableOpacity
            style={[styles.cardChat, styles.cardShadow]}
            onPress={() => navigation.navigate('Message', {matchDetails})}
        >
            <View style={styles.cardChatLeft}>
                <Image
                    style={styles.cardChatUserImage}
                    source={{ uri: imageUrl }}
                />
            </View>
            <View style={styles.cardChatRight}>
                <Text style={styles.cardChatName}>{matchedUserInfo?.fullName}</Text>
                <Text style={styles.cardChatMessage}>{lastMessage || "Démarrer la conversation 👋"}</Text>
            </View>
        </TouchableOpacity>
    )
}