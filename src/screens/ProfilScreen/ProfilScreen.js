import {View, Image, Text, TouchableOpacity} from 'react-native'
import React, {useEffect, useState} from 'react'
import Svg, { Path } from "react-native-svg";
import styles from './styles';
import {firebase} from "../../firebase/config";
import {Hyperlink} from "react-native-hyperlink";
import ButtonComponents from "../../components/ButtonComponents/ButtonComponents";
import HorizontalBar from "../../components/HorizontalBar/HorizontalBar";
import SkillComponents from "../../components/SkillComponents/SkillComponents";

export default function ProfilScreen({ route, navigation: { goBack } }) {
    const [userInfo, setUserInfo] = useState(route.params.profil)
    const [userImage, setUserImage] = useState()

    //in this useEffect, we get the url of user Image in the database
    useEffect(() => {
        firebase.storage()
            .ref('/' + userInfo.image) //name in storage in firebase console
            .getDownloadURL()
            .then((url) => {
                setUserImage(url);
            })
            .catch((e) => console.log('Errors while downloading => ', e));
    }, []);

    return (
        <View style={styles.container} >
            <View style={styles.topContainer}>
                <Image
                    style={styles.userImage}
                    source={{ uri: userImage}}
                />
                <Text style={styles.userName}>{userInfo.fullName}</Text>
                <View style={styles.stats}>
                    <View style={styles.collab}>
                        <Svg
                            width={24}
                            height={24}
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <Path
                                d="M21.71 8.71c1.25-1.25.68-2.71 0-3.42l-3-3c-1.26-1.25-2.71-.68-3.42 0L13.59 4H11C9.1 4 8 5 7.44 6.15L3 10.59v4l-.71.7c-1.25 1.26-.68 2.71 0 3.42l3 3c.54.54 1.12.74 1.67.74.71 0 1.36-.35 1.75-.74l2.7-2.71H15c1.7 0 2.56-1.06 2.87-2.1 1.13-.3 1.75-1.16 2-2C21.42 14.5 22 13.03 22 12V9h-.59l.3-.29ZM20 12c0 .45-.19 1-1 1h-1v1c0 .45-.19 1-1 1h-1v1c0 .45-.19 1-1 1h-4.41l-3.28 3.28c-.31.29-.49.12-.6.01l-2.99-2.98c-.29-.31-.12-.49-.01-.6L5 15.41v-4l2-2V11c0 1.21.8 3 3 3s3-1.79 3-3h7v1Zm.29-4.71L18.59 9H11v2c0 .45-.19 1-1 1s-1-.55-1-1V8c0-.46.17-2 2-2h3.41l2.28-2.28c.31-.29.49-.12.6-.01l2.99 2.98c.29.31.12.49.01.6Z"
                                fill="#FFF"
                            />
                        </Svg>
                        <Text style={styles.collabText}>12</Text>
                    </View>
                    <View style={styles.collab}>
                        <Svg
                            width={24}
                            height={24}
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <Path
                                d="M23 10a2 2 0 0 0-2-2h-6.32l.96-4.57c.02-.1.03-.21.03-.32 0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.58C7.22 7.95 7 8.45 7 9v10a2 2 0 0 0 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2ZM1 21h4V9H1v12Z"
                                fill="#FFF"
                            />
                        </Svg>
                        <Text style={styles.collabText}>12</Text>
                    </View>
                </View>
                <View  style={styles.stats}>
                    <View style={styles.collab}>
                        <Hyperlink
                            linkDefault={true}
                            linkText={(url) => url === userInfo.urlPerso ? 'Voir son portfolio' : 'Voir son portfolio'}>
                            <Text style={styles.collabText}>{userInfo.urlPerso}</Text>
                        </Hyperlink>
                    </View>
                </View>
                <HorizontalBar />
                <View styles={styles.descriptionSkills}>
                    <Text style={[styles.descriptionText, styles.titleWithoutMarginTop]}>Description :</Text>
                    <Text style={styles.descriptionText}>{userInfo.description}</Text>
                </View>
                <View styles={styles.descriptionSkills}>
                    <Text style={[styles.descriptionText, styles.title]}>Compétences :</Text>
                    <View style={styles.skillList}>
                        {
                            userInfo.skills ?
                                userInfo.skills.map((item) => {
                                    return (
                                        <View key={item} style={styles.skillItem}>
                                            <SkillComponents text={item} state={'enable'} />
                                        </View>
                                    )
                                })
                                : <Text style={styles.descriptionText}>Pas de compétences renseignées..</Text>
                        }
                    </View>
                </View>
            </View>
            <TouchableOpacity style={styles.buttonStyle} onPress={() => {
                goBack()
            }}>
                <ButtonComponents text={'Retour'} />
            </TouchableOpacity>
        </View>
    )
}