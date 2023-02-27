import React, { useState, useRef } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import {firebase} from '../../firebase/config';

export default function RegistrationScreen({navigation}) {
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [selectedRole, setSelectedRole] = useState(null);

    const onFooterLinkPress = () => {
        navigation.navigate('Login')
    }

    const onRegisterPress = () => {
        if(selectedRole === null) {
            alert('Veuillez sélectionner un rôle')
            return
        }
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((response) => {
                const uid = response.user.uid
                console.log(selectedRole)
                const data = {
                    id: uid,
                    email,
                    fullName,
                    role: selectedRole
                };
                const usersRef = firebase.firestore().collection('users')
                usersRef
                    .doc(uid)
                    .set(data)
                    .then(() => {
                        navigation.navigate('FirstConnection', {user: data})
                    })
                    .catch((error) => {
                        alert(error)
                    });
                navigation.navigate('FirstConnection', {user: data})
            })
            .catch((error) => {
                alert(error)
        });
    }

    const pickerSelectStyles = StyleSheet.create({

        inputIOS: {
            height: 48,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: '#E2E2E2',
            overflow: 'hidden',
            backgroundColor: 'white',
            marginTop: 10,
            paddingLeft: 16
        },
    
    });

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
                <Text style={styles.label}>Je suis</Text>
                <View style={styles.select}>
                    <RNPickerSelect
                        style={{ ...pickerSelectStyles }}
                        placeholder={{
                            label: 'Veuillez selectionner un rôle',
                            value: null
                        }}
                        selectedValue={selectedRole}
                        onValueChange={(itemValue, itemIndex) => {
                            setSelectedRole(itemValue)
                        }
                        }
                        items={[
                            { label: 'Newbie', value: 'newbie' },
                            { label: 'Mentor', value: 'mentor' }
                        ]}  
                    />
                </View>
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