import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import styles from './styles';

export default function ReceiverMessage({ message }) {
    return(
        <View>
            <Text>{message.message}</Text>
        </View>
    )
}