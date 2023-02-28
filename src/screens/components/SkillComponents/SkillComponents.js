import React from 'react'
import {Text, TouchableOpacity, View} from 'react-native'
import styles from './styles';
import Svg, {Path} from "react-native-svg";

export default function SkillComponents(props) {
    return (
        <TouchableOpacity
            onPress={() =>{
                props.onPress();
            }}
            style={[styles.skillComponents, props.state === 'selected' ? styles.skillComponentsSelected : props.state === 'enable' ? styles.skillComponentsEnable : props.state === 'disable' ? styles.skillComponentsDisable : null]}>
            <Text>{props.text}</Text>
        </TouchableOpacity>
    )
}