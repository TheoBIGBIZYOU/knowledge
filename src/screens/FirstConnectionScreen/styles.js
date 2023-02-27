import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        backgroundColor: '#161241',
        height: "100%",
        alignItems: 'center',
        paddingHorizontal: '10%'
    },
    userImageContainer: {
        position: "relative",
    },
    userImage: {
        width: 100,
        height: 100,
        marginTop: 100,
        borderRadius: 100,
        overflow: "hidden",
    },
    pictoChangePhoto: {
        position: 'absolute',
        bottom: "-2%",
        right: "2%",
        width: 25,
        height: 25,
        borderRadius: 100,
        overflow: "hidden",
    },
    userName: {
        color: 'white',
        marginTop: 20,
        fontWeight: 'bold',
        fontSize: 18,

    },
    subTitle: {
        color: 'white',
        marginTop: 20,
        textAlign: 'center'
    },
    horizontalBar: {
        marginTop: 30,
        backgroundColor: 'white',
        width: '100%',
        height: 1
    },
    textInput: {
        height:200,
        textAlignVertical: 'top',
        color: 'white'
    }
})