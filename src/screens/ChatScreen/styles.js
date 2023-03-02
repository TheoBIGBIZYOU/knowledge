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
        alignItems: 'center',
    },
    cardShadow: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2
    },  
    shadow: {
        shadowOffset: {width: 0, height: 4},  
        shadowColor: '#000',  
        shadowOpacity: 0.25,  
        shadowRadius: 3,     
    },
    userImage: {
        width: 80,
        height: 80,
        borderRadius: 100,
        overflow: 'hidden',
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
    },
    skills: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: (10 / -2),
    },
    actions: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 35
    },
    actionsButton: {
        width: 55,
        height: 55,
        backgroundColor: '#fff',
        borderRadius: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    actionSeeButton: {
        width: 66,
        height: 66,
        marginHorizontal: 26
    }
})