import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        alignItems: 'center',
        height: '100%',
        position: 'relative'
    },
    background: {
        position: 'absolute',
        width: '100%',
        height: '40%',
        top: 0,
        left: 0,
        backgroundColor: '#161241',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        pointerEvents: 'none'
    },
    title: {
        marginTop: 60,
        fontSize: 14,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        color: '#fff'
    },
    card: {
        marginTop: 25,
        backgroundColor: '#fff',
        borderRadius: 12,
        paddingVertical: 50,
        paddingHorizontal: 50,
        width: '85%',
        alignItems: 'center',
    },
    shadow: {
        shadowOffset: {width: 0, height: 4},  
        shadowColor: '#000',  
        shadowOpacity: 0.25,  
        shadowRadius: 3,     
    },
    userImage: {
        width: 150,
        height: 150,
        borderRadius: 100,
        overflow: 'hidden'
    },
    name: {
        marginTop: 28,
        fontSize: 18,
        fontWeight: 'bold'
    },
    stats: {
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: (20 / -2),
        marginTop: 25
    },
    collab: {
        marginHorizontal: (20 / 2),
    },
    descr: {
        marginVertical: 40,
        fontSize: 12,
    }
})