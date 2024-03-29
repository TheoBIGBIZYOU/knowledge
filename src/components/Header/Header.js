import React from 'react'
import { Text, View } from 'react-native'
import styles from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

export default function Header({title}) {
    const navigation = useNavigation();

    function backPress(){
        navigation.goBack()
    }

    return (
        <View>
            <TouchableOpacity style={styles.headerContainer}
                onPress={() => {
                    backPress()
                }}>
                    <Ionicons style={styles.headerContainerBtn} name='chevron-back-outline' size={34} color={'#161241'} />
                <Text style={styles.headerContainerTitle}>{title}</Text>
            </TouchableOpacity>
        </View>
    )
}