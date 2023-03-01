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
        bottom: '-2%',
        right: "5%",
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
    },
    skillList: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
    },
    skillItem: {
        marginRight: 10,
        marginBottom: 10,
    },

    input: {
        height: 35,
        width: '100%',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#E2E2E2',
        overflow: 'hidden',
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 24,
        paddingLeft: 16
    },
    linkView: {
        marginTop: 20
    }
})