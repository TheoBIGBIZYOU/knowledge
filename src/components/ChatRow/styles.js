import { StyleSheet } from 'react-native';

export default StyleSheet.create({
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
    cardChatRight: {
        width: '80%'
    },
    cardChatName: {
        fontWeight: 'bold',
        marginBottom: 8
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