import React, { useState } from 'react';
import { Image, Text, View, Pressable, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native'
import styles from './styles';
import * as ImagePicker from 'expo-image-picker';
import camPicto from '../../../assets/img/picto/cam.png'
import crossPicto from '../../../assets/img/picto/cross.png'
import paragraphPicto from '../../../assets/img/picto/paragraph.png'
import { firebase } from "../../firebase/config";
import ButtonComponents from "../components/ButtonComponents/ButtonComponents";
import RNPickerSelect from "react-native-picker-select";
import skillJSON from '../../../assets/json/skills.json';
import {Platform} from 'react-native';


const camPictoInfo = Image.resolveAssetSource(camPicto).uri;
const crossPictoInfo = Image.resolveAssetSource(crossPicto).uri;
const paragraphPictoInfo = Image.resolveAssetSource(paragraphPicto).uri;

const imagetest = "https://cdn.smehost.net/sonymusicfr-frprod/wp-content/uploads/2022/02/Vald.jpeg";

export default function FirstConnectionScreen({navigation}) {

    const [photo, setPhoto] = useState(imagetest);
    const [nextPart, setNextPart] = useState(false);
    const [description, setDescription] = useState(null);
    const [count, setCount] = useState(0);
    const [skill, setSkill] = useState([]);
    const [selectedSkill, setSelectedSkill] = useState(null);

    const user = firebase.auth().currentUser;


    async function uploadImage() {
        const response = await fetch(photo);
        const blob = await response.blob();
        const filename = photo.substring(photo.lastIndexOf('/')+1);
        var ref = firebase.storage().ref().child(filename).put(blob);

        try {
            await ref;
        }
        catch(e){
            console.log(e);
        }
    }

    function updateDescription() {
        firebase.firestore().collection('users')
            .doc(user.uid)
            .set({description: description}, {merge: true})
            .then(() => {
                setNextPart(!nextPart);
            })
            .catch((error) => {
                alert(error)
            });
    }

    function updateSkillAndPhoto() {
        const data = {
            image : photo.substring(photo.lastIndexOf('/')+1),
            skills : skill,
        };

        //upload image
        uploadImage();

        firebase.firestore().collection('users')
            .doc(user.uid)
            .set(data, {merge: true})
            .then(() => {
                navigation.navigate('Home', {user})
            })
            .catch((error) => {
                alert(error)
            });
    }

    //compte le nombre de character dans la description
    function resetDescription() {
        setCount(0);
        setDescription("");
    }

    function resetSkill(){
        setSkill([]);
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
                        <Text style={styles.subTitle}>Merci d’indiquer vos compétences, afin de trouver les mentors correspondant à votre recherche.</Text>
                        <View style={styles.horizontalBar} />
                        <View style={styles.topDescription}>
                            <View style={styles.paragraphView}>
                                <Text style={styles.descriptionText}>Appuyez pour sélectionner</Text>
                            </View>
                            <View style={styles.paragraphView}>
                                <Text style={styles.descriptionText} onPress={() => resetSkill()}>Supprimer tout</Text>
                                <Image
                                    style={styles.pictoCross}
                                    source={{ uri: crossPictoInfo }}
                                />
                            </View>
                        </View>
                        <View style={styles.topDescription}>
                            {
                                skill.map((item) => {
                                    return (
                                        <Text key={item} style={{color: 'white'}}>{item}</Text>
                                    )
                                })
                            }
                            <RNPickerSelect
                                placeholder={{
                                    label: 'Ajouter +',
                                    value: null
                                }}
                                selectedValue={selectedSkill}
                                onValueChange={(itemValue, itemIndex) => {
                                    if(Platform.OS !== 'ios'){
                                        setSkill([...skill,selectedSkill])
                                    }
                                    else{
                                        setSelectedSkill(itemValue);
                                    }
                                }
                                }
                                onDonePress={ () => {
                                    setSkill([...skill,selectedSkill])
                                }
                                }
                                items={skillJSON}
                            />
                        </View>
                    </View>
                </View>
                <TouchableOpacity style={nextPart ? styles.disableView : null} onPress={() => updateDescription()}>
                    <ButtonComponents text={'Continuer'} />
                </TouchableOpacity>
                <TouchableOpacity style={nextPart ? null : styles.disableView} onPress={() => updateSkillAndPhoto()}>
                    <ButtonComponents text={'Valider'} />
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    )
}