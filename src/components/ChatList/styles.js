import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    chatContainer: {
        height: '100%',
        position: 'relative',
    },
    cardChat: {
        marginTop: 25,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 16,
        alignItems: 'center',
        flexDirection: 'row',

    },
    cardChatLeft: {
        marginRight: 14,
        width: '20%'
    },  
    cardChatName: {
        fontWeight: 'bold'
    },
    cardChatMessage: {
        width: '80%'
    },
    cardShadow: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5
    }, 
    cardChatUserImage: {
        width: 55,
        height: 55,
        borderRadius: 100,
        overflow: 'hidden',
    },
})