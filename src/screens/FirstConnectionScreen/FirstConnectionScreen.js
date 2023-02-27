import React, {useState} from 'react'
import {Image, Text, View, Pressable, TextInput} from 'react-native'
import styles from './styles';
import * as ImagePicker from 'expo-image-picker';
import camPicto from '../../../assets/img/picto/cam.png'
import {firebase} from "../../firebase/config";
import ButtonComponents from "../components/ButtonComponents/ButtonComponents";

const camPictoInfo = Image.resolveAssetSource(camPicto).uri;

const imagetest = "https://cdn.smehost.net/sonymusicfr-frprod/wp-content/uploads/2022/02/Vald.jpeg";

export default function FirstConnectionScreen(props) {

    const [photo, setPhoto] = useState(imagetest);

    const user = firebase.auth().currentUser;
    const userInfo = firebase.firestore().collection('users')


    return (
        <View style={styles.container}>
            <Pressable style={styles.userImageContainer} onPress={async () => {
                let result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.All,
                    allowsEditing: true,
                    aspect: [4, 3],
                    quality: 1,
                });
                console.log(user);
                if (!result.cancelled) {
                    setPhoto(result.assets[0].uri);
                }
            }
            }>
                <Image
                    style={styles.userImage}
                    source= {photo ? {uri: photo} : {uri: imagetest}}
                />
                <Image
                    style={styles.pictoChangePhoto}
                    source={{uri: camPictoInfo}}
                />
            </Pressable>
            <Text style={styles.userName}>Valentin</Text>
            <Text style={styles.subTitle}>Merci d’entrer une description de vous, vos compétences, votre projet et ce sur quoi votre mentor peut vous aider.</Text>
            <View style={styles.horizontalBar}></View>
            <TextInput
                class={styles.textInput}
                multiline={true}
                numberOfLines={10}
                placeholderTextColor='white'
                placeholder="Entrer votre description..."/>
            <ButtonComponents text={'test'} />
        </View>
    )
}