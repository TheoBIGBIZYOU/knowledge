import React from 'react'
import { Text, View } from 'react-native'
import styles from './styles';

export default function SenderMessage({ message }) {
    return(
        <View>
        <Text style={styles.senderMessage}>{message.message}</Text>
        </View>
    )
}