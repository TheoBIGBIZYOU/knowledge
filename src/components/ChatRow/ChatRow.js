import React, { useEffect, useState } from 'react'
import { Text, View, Image } from 'react-native'
import styles from './styles';
import { firebase } from "../../firebase/config";
import { TouchableOpacity } from 'react-native-gesture-handler';
import getMatchedUserInfo from '../../../lib/getMatchedUserInfo';
import { useNavigation } from '@react-navigation/native';

export default function ChatRow({ matchDetails }) {
    const navigation = useNavigation();
    const user = firebase.auth().currentUser;
    const [matchedUserInfo, setMatchedUserInfo] = useState(null);

    useEffect(() => {
        setMatchedUserInfo(getMatchedUserInfo(matchDetails.users, user.uid));
    }, [matchDetails, user]);



    return (
        <TouchableOpacity
            style={[styles.cardChat, styles.cardShadow]}
            onPress={() => navigation.navigate('Message', {matchDetails})}
        >
            <View style={styles.cardChatLeft}>
                <Image
                    style={styles.cardChatUserImage}
                    source={{ uri: matchedUserInfo?.image }}
                />
            </View>
            <View style={styles.cardChatRight}>
                <Text style={styles.cardChatName}>{matchedUserInfo?.fullName}</Text>
                <Text style={styles.cardChatMessage}>Hello</Text>
            </View>
        </TouchableOpacity>
    )
}