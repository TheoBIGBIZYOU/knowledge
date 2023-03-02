import React from 'react'
import { Text,View, Image } from 'react-native'
import styles from './styles';

export default function ChatList(props) {

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