import React, { useEffect, useState } from 'react';
import { Image, Text, View, Pressable, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native'
import styles from './styles';
import Svg, { Circle, Path } from "react-native-svg";
import * as ImagePicker from 'expo-image-picker';
import { firebase } from "../../firebase/config";
import ButtonComponents from "../../components/ButtonComponents/ButtonComponents";
import RNPickerSelect from "react-native-picker-select";
import skillJSON from '../../../assets/json/skills.json';
import { Platform } from 'react-native';
import SkillComponents from "../../components/SkillComponents/SkillComponents";
import HorizontalBar from "../../components/HorizontalBar/HorizontalBar";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';



import { onSnapshot } from 'firebase/firestore'

const imagetest = "https://cdn.smehost.net/sonymusicfr-frprod/wp-content/uploads/2022/02/Vald.jpeg";

export default function FirstConnectionScreen() {
    const navigation = useNavigation();

    function backPress() {
        navigation.goBack()
    }

    const [photo, setPhoto] = useState(imagetest);
    const [nextPart, setNextPart] = useState(false);
    const [description, setDescription] = useState(null);
    const [count, setCount] = useState(0);
    const [skill, setSkill] = useState([]);
    const [selectedSkill, setSelectedSkill] = useState(null);
    const [userLink, setUserLink] = useState(null);

    const [userInfo, setUserInfo] = useState([])

    //user info
    const user = firebase.auth().currentUser;

    useEffect(() => {
        const dataUser = firebase.firestore().collection("users").where("id", "==", user.uid)
        //we get the userIndo
        const unSubscribe = onSnapshot(dataUser, (snapshot) => {
            let results = []
            snapshot.docs.forEach(userInfo => {
                results.push({ ...userInfo.data(), id: userInfo.id })
            })
            setUserInfo(results[0])
        })

        if (userInfo.description != undefined) setDescription(userInfo.description);
        if (userInfo.skills != undefined) setSkill(userInfo.skills);
        if (userInfo.urlPerso != undefined) setUserLink(userInfo.urlPerso);
    }, []);


    //we upload the image in firebase
    async function uploadImage() {
        const response = await fetch(photo);
        const blob = await response.blob();
        const filename = photo.substring(photo.lastIndexOf('/') + 1);
        var ref = firebase.storage().ref().child(filename).put(blob);

        try {
            await ref;
        }
        catch (e) {
            console.log(e);
        }
    }

    //set new Description
    function updateDescription() {
        firebase.firestore().collection('users')
            .doc(user.uid)
            .set({ description: description }, { merge: true })
            .then(() => {
                setNextPart(!nextPart);
            })
            .catch((error) => {
                alert(error)
            });
    }

    //set new skills and photo
    function updateSkillAndPhoto() {
        const data = {
            image: photo.substring(photo.lastIndexOf('/') + 1),
            skills: skill,
            urlPerso: userLink,
        };

        //upload image
        uploadImage();

        firebase.firestore().collection('users')
            .doc(user.uid)
            .set(data, { merge: true })
            .then(() => {
                navigation.navigate('Home')
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
    //reset skills
    function resetSkill() {
        setSkill([]);
    }

    const pickerStyle = {
        inputIOS: {
            paddingVertical: 5,
            paddingHorizontal: 22,
            borderRadius: 100,
            fontSize: 14,
            backgroundColor: '#5992FF',
            color: '#fff',
            textAlign: 'center',
        },
        inputAndroid: {
            paddingVertical: 5,
            paddingHorizontal: 22,
            borderRadius: 100,
            fontSize: 14,
            backgroundColor: '#5992FF',
            color: '#fff'
        },
        placeholder: {
            color: "white",
            fontSize: 14,
        },
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}
            accessible={false}>
            <View style={styles.container}>
                <TouchableOpacity style={styles.headerContainer}
                    onPress={() => {
                        backPress()
                    }}>
                    <Ionicons style={styles.headerContainerBtn} name='chevron-back-outline' size={34} color={'#fff'} />
                </TouchableOpacity>
                <View style={styles.topContainer}>
                    <Pressable style={styles.userImageContainer} onPress={async () => {

                        let result = await ImagePicker.launchImageLibraryAsync({
                            mediaTypes: ImagePicker.MediaTypeOptions.All,
                            allowsEditing: true,
                            aspect: [4, 3],
                            quality: 1,
                        });
                        if (!result.canceled) {
                            setPhoto(result.assets[0].uri);
                        }
                    }
                    }>
                        <Image
                            style={styles.userImage}
                            source={photo ? { uri: photo } : { uri: imagetest }}
                        />
                        <Svg
                            style={styles.pictoChangePhoto}
                            width={34}
                            height={34}
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <Circle
                                cx={17}
                                cy={17}
                                r={16}
                                fill="#D9D9D9"
                                stroke="#161241"
                                strokeWidth={2}
                            />
                            <Path
                                d="M17 21.125c.938 0 1.735-.328 2.391-.985.657-.656.985-1.453.984-2.39 0-.938-.328-1.735-.985-2.391-.656-.656-1.453-.985-2.39-.984-.938 0-1.735.328-2.391.985-.656.656-.985 1.453-.984 2.39 0 .938.328 1.735.985 2.391.656.657 1.453.985 2.39.984Zm-6 2.625c-.412 0-.766-.147-1.06-.441a1.442 1.442 0 0 1-.44-1.059v-9c0-.412.147-.766.441-1.06.294-.294.647-.44 1.059-.44h2.363l.937-1.012c.137-.163.303-.285.497-.367.194-.081.397-.122.608-.121h3.188c.212 0 .416.04.61.122.194.082.36.204.496.366l.938 1.012H23c.413 0 .766.147 1.06.441.294.294.44.647.44 1.059v9c0 .413-.147.766-.441 1.06-.294.294-.647.44-1.059.44H11Z"
                                fill="#000"
                            />
                        </Svg>
                    </Pressable>
                    <Text style={styles.userName}>{userInfo.fullName}</Text>

                    <View class='firstPart' style={nextPart ? styles.disableView : null}>
                        <Text style={styles.subTitle}>Merci d’entrer une description de vous, vos compétences, votre projet et ce sur quoi votre mentor peut vous aider.</Text>
                        <HorizontalBar />
                        <View style={styles.topDescription}>
                            <View style={styles.paragraphView}>
                                <Svg
                                    width={24}
                                    height={24}
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    style={styles.pictoParagraph}
                                >
                                    <Path
                                        d="M13 13.5H3a1 1 0 0 0 0 2h10a1 1 0 0 0 0-2Zm8-5H3a1 1 0 0 0 0 2h18a1 1 0 0 0 0-2Z"
                                        fill="#fff"
                                    />
                                </Svg>
                                <Text style={styles.descriptionText}>{count}/250</Text>
                            </View>
                            <View style={styles.paragraphView}>
                                <Text style={styles.descriptionText} onPress={() => resetDescription()}>Supprimer tout</Text>
                                <Svg
                                    width={14}
                                    height={14}
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    style={styles.pictoCross}
                                >
                                    <Path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M10.996 3.763a.536.536 0 1 0-.758-.76L7 6.241 3.763 3.003a.537.537 0 1 0-.76.76L6.241 7l-3.238 3.237a.537.537 0 0 0 .76.76L7 7.758l3.238 3.237a.537.537 0 0 0 .758-.76L7.76 7l3.237-3.237Z"
                                        fill="#fff"
                                    />
                                </Svg>
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
                        <HorizontalBar />
                        <View style={styles.topDescription}>
                            <View style={styles.paragraphView}>
                                <Text style={styles.descriptionText}>Appuyez pour supprimer</Text>
                            </View>
                            <View style={styles.paragraphView}>
                                <Text style={styles.descriptionText} onPress={() => resetSkill()}>Supprimer tout</Text>
                                <Svg
                                    width={14}
                                    height={14}
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    style={styles.pictoCross}
                                >
                                    <Path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M10.996 3.763a.536.536 0 1 0-.758-.76L7 6.241 3.763 3.003a.537.537 0 1 0-.76.76L6.241 7l-3.238 3.237a.537.537 0 0 0 .76.76L7 7.758l3.238 3.237a.537.537 0 0 0 .758-.76L7.76 7l3.237-3.237Z"
                                        fill="#fff"
                                    />
                                </Svg>
                            </View>
                        </View>
                        <View style={styles.skillList}>
                            {
                                skill.map((item) => {
                                    return (
                                        <TouchableOpacity key={item} style={styles.skillItem}>
                                            <SkillComponents text={item} state={'enable'} onPress={() => {
                                                let newSkills = [];
                                                newSkills.push(...skill);
                                                let index = newSkills.indexOf(item);
                                                newSkills.splice(index, 1);
                                                setSkill(newSkills);
                                            }} />
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </View>

                        <RNPickerSelect
                            style={pickerStyle}
                            placeholder={{
                                label: 'Ajouter +',
                                value: null
                            }}
                            selectedValue={selectedSkill}
                            onValueChange={(itemValue, itemIndex) => {
                                if (Platform.OS !== 'ios') {
                                    if (selectedSkill === null) {
                                        alert('Veuillez selectionner une compétence')
                                    }
                                    else if (skill.includes(selectedSkill)) {
                                        setSelectedSkill(null)
                                        alert('Cette compétence a déjà été selectionnée')
                                    }
                                    else {
                                        setSkill([...skill, selectedSkill])
                                        setSelectedSkill(null)
                                    }
                                }
                                else {
                                    setSelectedSkill(itemValue);
                                }
                            }
                            }
                            onDonePress={() => {
                                if (selectedSkill === null) {
                                    alert('Veuillez selectionner une compétence')
                                }
                                else if (skill.includes(selectedSkill)) {
                                    setSelectedSkill(null)
                                    alert('Cette compétence a déjà été selectionnée')
                                }
                                else {
                                    setSkill([...skill, selectedSkill])
                                    setSelectedSkill(null)
                                }
                            }
                            }
                            value={selectedSkill}
                            items={skillJSON}
                        />
                        {
                            userInfo.role === 'mentor' ?
                                <View style={styles.linkView}>
                                    <Text style={styles.descriptionText}>Ajouter le lien de votre site personnel</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholderTextColor="#aaaaaa"
                                        onChangeText={(text) => setUserLink(text)}
                                        value={userLink}
                                        underlineColorAndroid="transparent"
                                        autoCapitalize="none"
                                    />
                                </View>
                                :
                                null
                        }
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