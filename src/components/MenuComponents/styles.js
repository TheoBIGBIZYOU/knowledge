import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    bottomNav: {
        position: 'absolute',
        bottom: 0,
        height: 50,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 35,
        backgroundColor: '#161241',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        flex: 1,
    },
    iconMiddle: {
        marginLeft: 50,
        marginRight: 50,
    }
})