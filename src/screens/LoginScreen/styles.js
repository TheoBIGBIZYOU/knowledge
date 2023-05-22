import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 50
    },
    title: {

    },
    logo: {
        flex: 1,
        height: 120,
        width: 90,
        alignSelf: "center",
        margin: 30
    },
    label: {
        marginLeft: 30,
        marginRight: 30
    },
    resetPassword: {
        flex: 1,
        alignItems: "center",
        marginTop: 24
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
        backgroundColor: '#5992FF',
        marginLeft: 30,
        marginRight: 30,
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
        marginTop: 45,
        borderTopWidth: 1,
        borderColor: '#E2E2E2',
        marginLeft: 30,
        marginRight: 30
    },
    footerText: {
        fontSize: 16,
        color: '#2e2e2d',
        marginBottom: 10,
        paddingTop: 24
    },
    footerLink: {
        color: "#5992FF",
        fontWeight: "bold",
        fontSize: 16
    }
})