import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    title: {
        marginHorizontal: 30,
        fontSize: 34,
        fontWeight: 'bold'
    },
    baseline: {
        marginHorizontal: 30,
        marginTop: 26,
        marginBottom: 17
    },  
    logo: {
        flex: 1,
        height: 120,
        width: 90,
        alignSelf: "center",
        margin: 30
    },
    label: {
        marginHorizontal: 30,
        fontWeight: 'bold'
    },
    select: {
        marginHorizontal: 30
    },  
    pickerSelectStyles: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
    },
    input: {
        height: 48,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#E2E2E2',
        overflow: 'hidden',
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 24,
        marginLeft: 30,
        marginRight: 30,
        paddingLeft: 16
    },
    button: {
        backgroundColor: '#788eec',
        marginHorizontal: 30,
        marginTop: 20,
        height: 48,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center'
    },
    buttonTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: "bold"
    },
    footerView: {
        flex: 1,
        alignItems: "center",
        marginTop: 20
    },
    footerText: {
        fontSize: 16,
        color: '#2e2e2d'
    },
    footerLink: {
        color: "#788eec",
        fontWeight: "bold",
        fontSize: 16
    }
})