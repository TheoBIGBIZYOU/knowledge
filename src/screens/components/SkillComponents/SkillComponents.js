import React from 'react'
import { Text,View } from 'react-native'
import styles from './styles';

export default function SkillComponents(props) {
    return (
        <View style={[styles.skillComponents, props.etat === 'selected' ? styles.skillComponentsSelected : props.etat === 'enable' ? styles.skillComponentsEnable : props.etat === 'disable' ? styles.skillComponentsDisable : null]}>
            <Text>{props.text}</Text>
        </View>
    )
}