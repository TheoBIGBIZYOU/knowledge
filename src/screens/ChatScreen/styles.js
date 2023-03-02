import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        height: '100%',
        position: 'relative'
    },
    background: {
        position: 'absolute',
        width: '100%',
        height: '35%',
        top: 0,
        left: 0,
        backgroundColor: '#161241',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        pointerEvents: 'none'
    }, 
    startChatContainer: {
        borderTopWidth: 1,
        borderTopColor: '#fff',
        width: '80%',
        alignItems: 'center',
        paddingTop: 27,
        marginBottom: 22
    },      
    startChat: {
        alignItems: 'center',
        color: '#fff',
    },
    title: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 12,
        width: '80%',
        marginVertical: 14
    },  
    chatContainer: {
        width: '100%'
    },
    btnStartChat: {
        marginHorizontal: 20
    },
    userImage: {
        width: 80,
        height: 80,
        borderRadius: 100,
        overflow: 'hidden',
    },
    userName: {
        color: '#fff',
        textAlign: 'center',
        marginTop: 10,
        fontSize: 12
    },
    chatsContainer: {
        marginTop: 40,
        marginHorizontal: 20
    }

})