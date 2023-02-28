import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    skillComponents: {
        paddingVertical: 5,
        paddingHorizontal: 22,
        borderRadius: 100,
        fontSize: 10,
        borderWidth: 1,
        margin: (10 / 2),
    },
    skillComponentsEnable: {
        borderColor: '#fff',
        color: '#000',
        backgroundColor: '#fff'
    },
    skillComponentsDisable: {
        borderColor: '#fff',
        color: '#fff',
        backgroundColor: 'transparent'
    },
    skillComponentsSelected: {
        borderColor: '#5992FF',
        backgroundColor: '#5992FF',
        color: '#fff'
    }
})