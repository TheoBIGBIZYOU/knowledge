import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import {firebase} from "../../firebase/config";

export default function LoginScreen({navigation}) {

    const [email, setEmail] = useState('valentindiev62@gmail.com')
    const [password, setPassword] = useState('testtest')

    //function redirect to Registration screen
    const onFooterLinkPress = () => {
        navigation.navigate('Registration')
    }

    //function for login the user. We check with the database if the user exist, if yes, we connect
    //the user, if no, we return error message
    const onLoginPress = () => {
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((response) => {
                const uid = response.user.uid
                const usersRef = firebase.firestore().collection('users')
                usersRef
                    .doc(uid)
                    .get()
                    .then(firestoreDocument => {
                        if (!firestoreDocument.exists) {
                            alert("User does not exist anymore.")
                            return;
                        }
                        const user = firestoreDocument.data()
                        navigation.navigate('Home')
                        // navigation.navigate('Chat', {user})
                    })
                    .catch(error => {
                        alert(error)
                    });
            })
            .catch(error => {
                alert(error)
            })
    }

    //function for reset the password by mail
    function onResetPress() {
        firebase
            .auth()
            .sendPasswordResetEmail(email)
            .then(() => {
                alert("Password reset email send")
            }).catch((error) => {
                alert(error)
            })
    }

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
                <Image
                    style={styles.logo}
                    source={require('../../../assets/img/knowledge.png')}
                />
                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <Text style={styles.label}>Mot de passe</Text>
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onLoginPress()}>
                    <Text style={styles.buttonTitle}>Se connecter</Text>
                </TouchableOpacity>
                <View style={styles.resetPassword}>
                    <Text onPress={onResetPress} style={styles.footerLink}>Mot de passe oublié ?</Text>
                </View>
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>Vous n'avez pas de compte ?</Text>
                    <Text onPress={onFooterLinkPress} style={styles.footerLink}>S'inscrire</Text>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}