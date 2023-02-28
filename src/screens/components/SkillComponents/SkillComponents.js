import React from 'react'
import { Text,View } from 'react-native'
import styles from './styles';

export default function SkillComponents(props) {
    return (
        <View style={[styles.skillComponents, props.state === 'selected' ? styles.skillComponentsSelected : props.state === 'enable' ? styles.skillComponentsEnable : props.state === 'disable' ? styles.skillComponentsDisable : null]}>
            <Text style={props.state === 'enable' ? {color : 'black'} : {color : 'white'}}>{props.text}</Text>
        </View>
    )
}