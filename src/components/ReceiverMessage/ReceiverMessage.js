import React from 'react'
import { Text, View } from 'react-native'
import styles from './styles';

export default function ReceiverMessage({ message }) {
    return(
        <View>
            <Text style={styles.receiverMessage}>{message.message}</Text>
        </View>
    )
}