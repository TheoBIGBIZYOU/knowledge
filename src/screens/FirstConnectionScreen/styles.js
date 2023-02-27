import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        backgroundColor: '#161241',
        height: "100%",
        paddingHorizontal: '10%',
        paddingVertical: '20%',
        display: 'flex',
        justifyContent: 'space-between',
    },
    topContainer:{
        alignItems: 'center',
    },
    userImageContainer: {
        position: "relative",
    },
    userImage: {
        width: 173,
        height: 173,
        borderRadius: 100,
        overflow: "hidden",
    },
    pictoChangePhoto: {
        position: 'absolute',
        bottom: "-2%",
        right: "2%",
        width: 40,
        height: 40,
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
        height: 2
    },
    bottomContainer: {
        width: '100%',
    },
    textInput: {
        height:200,
        width: '100%',
        textAlignVertical: 'top',
        color: 'white'
    },
    activeView: {
        display: 'block'
    },
    disableView: {
        display: 'none'
    },
    topDescription: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10
    },
    descriptionText: {
        color: 'white',
    },
    pictoParagraph: {
        width: 25,
        height: 25,
        marginRight: 5,
    },
    pictoCross: {
        width: 25,
        height: 25,
        marginLeft: 5
    },
    paragraphView: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        rowGap: 100,
    },
    textUnderButton: {
        color: 'white',
        marginTop: 15,
        fontSize: 14,
        textAlign: 'center'
    }
})