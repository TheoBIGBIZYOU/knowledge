import React from 'react'
import { Text,View } from 'react-native'
import styles from './styles';

export default function ButtonComponents(props) {

    return (
        <View style={styles.buttonComponents}>
            <Text>{props.text}</Text>
        </View>
    )
}