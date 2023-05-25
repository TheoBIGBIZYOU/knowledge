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
    const [urlImage, setUrlImage] = useState('');

    useEffect(() => {
        let resultsImage = []
        setMatchedUserInfo(getMatchedUserInfo(matchDetails.users, user.uid));
        console.log(matchedUserInfo)
        // const url = firebase.storage()
        //     .ref('/' + matchedUserInfo.image) //name in storage in firebase console
        //     .getDownloadURL()
        // resultsImage.push(url);

        // setUrlImage(resultsImage);

    }, [matchDetails, user]);



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
                {/* <Text style={styles.cardChatMessage}>{urlImage}</Text> */}
            </View>
        </TouchableOpacity>
    )
}