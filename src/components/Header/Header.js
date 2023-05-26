import React from 'react'
import { Text, View } from 'react-native'
import styles from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

export default function Header({title}) {
    const navigation = useNavigation();
    return (
        <View>
            <View style={styles.headerContainer}>
                <TouchableOpacity style={styles.headerContainerBtn} onPress={() => {
                    console.log("je clique")
                    navigation.goBack()
                }}>
                    <Ionicons name='chevron-back-outline' size={34} color={'#161241'} />
                </TouchableOpacity>
                <Text style={styles.headerContainerTitle}>{title}</Text>
            </View>
        </View>
    )
}