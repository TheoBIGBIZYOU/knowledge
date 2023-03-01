import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        backgroundColor: '#161241',
        height: "100%",
        paddingHorizontal: '10%',
        paddingVertical: '20%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',

    },
    topContainer:{
        alignItems: 'center',
    },
    userImage: {
        width: 173,
        height: 173,
        borderRadius: 100,
        overflow: "hidden",
    },
    userName: {
        color: 'white',
        marginTop: 20,
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',

    },
    descriptionSkills: {
        alignItems: 'left',
    },
    descriptionText: {
        fontSize: 12,
        color: 'white',
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
    title: {
        fontSize: 14,
        marginTop: 15,
        marginBottom: 10,
    },
    titleWithoutMarginTop: {
        fontSize: 14,
        marginBottom: 10,
    },
    buttonStyle: {
        width: '100%',
    },

    stats: {
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: (20 / -2),
        marginTop: 25
    },
    collab: {
        marginHorizontal: (20 / 2),
        color: 'white'
    },
    collabText: {
        color: 'white'
    },
})