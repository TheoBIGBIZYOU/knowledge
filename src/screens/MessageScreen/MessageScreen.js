import { View, SafeAreaView, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './styles';
import { firebase } from "../../firebase/config";
import { onSnapshot } from "firebase/firestore";
import Header from '../../components/Header/Header';

export default function MessageScreen() {
    const user = firebase.auth().currentUser;

    useEffect(() => {

    }, []);

    return (
        <SafeAreaView>
            <Header title="Message"/>
            <View style={styles.container}>
                <Text>Message test</Text>
            </View>

        </SafeAreaView>
    )
}