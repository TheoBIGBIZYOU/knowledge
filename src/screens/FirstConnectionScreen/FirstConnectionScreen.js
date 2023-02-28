import React, { useState } from 'react'
import { Image, Text, View, Pressable, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native'
import styles from './styles';
import * as ImagePicker from 'expo-image-picker';
import camPicto from '../../../assets/img/picto/cam.png'
import crossPicto from '../../../assets/img/picto/cross.png'
import paragraphPicto from '../../../assets/img/picto/paragraph.png'
import { firebase } from "../../firebase/config";
import ButtonComponents from "../components/ButtonComponents/ButtonComponents";

const camPictoInfo = Image.resolveAssetSource(camPicto).uri;
const crossPictoInfo = Image.resolveAssetSource(crossPicto).uri;
const paragraphPictoInfo = Image.resolveAssetSource(paragraphPicto).uri;

const imagetest = "https://cdn.smehost.net/sonymusicfr-frprod/wp-content/uploads/2022/02/Vald.jpeg";

export default function FirstConnectionScreen(props) {

    const [photo, setPhoto] = useState(imagetest);
    const [nextPart, setNextPart] = useState(false);
    const [description, setDescription] = useState(null);
    const [count, setCount] = React.useState(0);

    const user = firebase.auth().currentUser;

    function stateEtape() {
        setNextPart(!nextPart);
        console.log("salut");
        if(nextPart === true){
            console.log("je rentre")
            const data = {
                description: description,
            };

            firebase.firestore().collection('users')
                .doc(user.uid)
                .set(data, {merge: true})
                .then(() => {
                    console.log("c'est bon")
                })
                .catch((error) => {
                    alert(error)
                });
        }

    }

    function resetDescription() {
        setCount(0);
        setDescription("");
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}
            accessible={false}>
            <View style={styles.container}>
                <View style={styles.topContainer}>
                    <Pressable style={styles.userImageContainer} onPress={async () => {
                        let result = await ImagePicker.launchImageLibraryAsync({
                            mediaTypes: ImagePicker.MediaTypeOptions.All,
                            allowsEditing: true,
                            aspect: [4, 3],
                            quality: 1,
                        });
                        if (!result.cancelled) {
                            setPhoto(result.assets[0].uri);
                        }
                    }
                    }>
                        <Image
                            style={styles.userImage}
                            source={photo ? { uri: photo } : { uri: imagetest }}
                        />
                        <Image
                            style={styles.pictoChangePhoto}
                            source={{ uri: camPictoInfo }}
                        />
                    </Pressable>
                    <Text style={styles.userName}>Valentin</Text>

                    <View class='firstPart' style={nextPart ? styles.disableView : null}>
                        <Text style={styles.subTitle}>Merci d’entrer une description de vous, vos compétences, votre projet et ce sur quoi votre mentor peut vous aider.</Text>
                        <View style={styles.horizontalBar} />
                        <View style={styles.topDescription}>
                            <View style={styles.paragraphView}>
                                <Image
                                    style={styles.pictoParagraph}
                                    source={{ uri: paragraphPictoInfo }}
                                />
                                <Text style={styles.descriptionText}>{count}/250</Text>
                            </View>
                            <View style={styles.paragraphView}>
                                <Text style={styles.descriptionText} onPress={() => resetDescription()}>Supprimer tout</Text>
                                <Image
                                    style={styles.pictoCross}
                                    source={{ uri: crossPictoInfo }}
                                />
                            </View>
                        </View>
                        <TextInput
                            style={styles.textInput}
                            multiline={true}
                            maxLength={250}
                            placeholderTextColor='white'
                            value={description}
                            onChangeText={(text) => {
                                setDescription(text);
                                setCount(text.length)
                            }}
                            placeholder="Entrer votre description..." />
                    </View>

                    <View style={nextPart ? null : styles.disableView} class="secondPart">
                        <Text style={styles.subTitle}>test</Text>
                    </View>
                </View>
                <TouchableOpacity style={nextPart ? styles.disableView : null} onPress={() => stateEtape()}>
                    <ButtonComponents text={'Continuer'} />
                </TouchableOpacity>
                <TouchableOpacity style={nextPart ? null : styles.disableView}>
                    <ButtonComponents text={'Valider'} />
                    <Text style={styles.textUnderButton} onPress={() => stateEtape()}>Retour</Text>
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    )
}