import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
// import {Picker} from '@react-native-picker/picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import {firebase} from '../../firebase/config';

export default function RegistrationScreen({navigation}) {
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const onFooterLinkPress = () => {
        navigation.navigate('Login')
    }

    const onRegisterPress = () => {
        if (password !== confirmPassword) {
            alert("Passwords don't match.")
            return
        }
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((response) => {
                const uid = response.user.uid
                const data = {
                    id: uid,
                    email,
                    fullName,
                };
                const usersRef = firebase.firestore().collection('users')
                usersRef
                    .doc(uid)
                    .set(data)
                    .then(() => {
                        navigation.navigate('Home', {user: data})
                    })
                    .catch((error) => {
                        alert(error)
                    });
                navigation.navigate('Home', {user: data})
            })
            .catch((error) => {
                alert(error)
        });
    }

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
                <Text style={styles.title}>Se créer un compte</Text>
                <Text style={styles.baseline}>Tous les champs sont obligatoires</Text>
                <Text style={styles.label}>Nom complet</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => setFullName(text)}
                    value={fullName}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <Text style={styles.label}>Mot de passe</Text>
                <TextInput
                    style={styles.input}
                    secureTextEntry
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <Text style={styles.label}>Confirmer le mot de passe</Text>
                <TextInput
                    style={styles.input}
                    secureTextEntry
                    onChangeText={(text) => setConfirmPassword(text)}
                    value={confirmPassword}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <Text style={styles.label}>Je suis</Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onRegisterPress()}>
                    <Text style={styles.buttonTitle}>S'inscrire</Text>
                </TouchableOpacity>
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>Vous avez déjà un compte ?</Text>
                    <Text onPress={onFooterLinkPress} style={styles.footerLink}>Se connecter</Text>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}