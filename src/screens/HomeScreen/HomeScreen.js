import { Text, View, Image, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Svg, { Path } from "react-native-svg";
import styles from './styles';
import SkillComponents from "../components/SkillComponents/SkillComponents";
import Swiper from "react-native-deck-swiper";
import { firebase } from "../../firebase/config";
import { onSnapshot } from "firebase/firestore";

export default function HomeScreen(props) {
    const [profiles, setProfiles] = useState([]);
    const [imageUrl, setImageUrl] = useState([]);
    const swipeRef = useRef(null);

    useEffect(() => {
        const dataUser = firebase.firestore().collection("users").where("role", "==", "mentor")
        const unSubscribe = onSnapshot(dataUser, (snapshot) => {
            let results = []
            let resultsImage = []
            snapshot.docs.forEach((profil, index) => {
                // console.log(profil.data())
                //Get image profil
                firebase.storage()
                    .ref('/' + profil.data().image) //name in storage in firebase console
                    .getDownloadURL()
                    .then((url) => {
                        resultsImage.push(url)
                        setImageUrl(resultsImage.reverse());
                    })
                    .catch((e) => console.log('Errors while downloading => ', e));
                //Push profil to const
                results.push({ ...profil.data(), id: profil.id })
            })
            setProfiles(results);
            // console.log(imageUrl);
        })
    }, []);

    const swipeRight = async (cardIndex) => {
        if(!profiles[cardIndex]) return;

        const userSwiped = profiles[cardIndex];
        console.log(userSwiped.id);
    }

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <View style={styles.background}></View>
                <Text style={styles.title}>Cherche ton mentor</Text>
                <Swiper
                    ref={swipeRef}
                    containerStyle={{ backgroundColor: 'transparent' }}
                    cards={profiles}
                    stackSize={5}
                    cardIndex={0}
                    animateCardOpacity
                    verticalSwipe={false}
                    onSwipedRight={(cardIndex) => {
                        swipeRight(cardIndex);
                    }}
                    renderCard={(card, index) => card ? (
                        <View key={card.id}
                            style={[styles.card, styles.cardShadow]}
                        >
                            <View style={styles.shadow}>
                                <Image
                                    style={styles.userImage}
                                    source={{ uri: imageUrl[index] }}
                                />
                            </View>
                            <Text style={styles.name}>{card.fullName}</Text>
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
                                            fill="#161241"
                                        />
                                    </Svg>
                                    <Text>12</Text>
                                </View>
                                <View style={styles.collab}>
                                    <Svg
                                        width={24}
                                        height={24}
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        {...props}
                                    >
                                        <Path
                                            d="M23 10a2 2 0 0 0-2-2h-6.32l.96-4.57c.02-.1.03-.21.03-.32 0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.58C7.22 7.95 7 8.45 7 9v10a2 2 0 0 0 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2ZM1 21h4V9H1v12Z"
                                            fill="#161241"
                                        />
                                    </Svg>
                                    <Text>12</Text>
                                </View>
                            </View>
                            <Text style={styles.descr}>{card.description}</Text>
                            <View style={styles.skills}>
                                <SkillComponents text={'ttt'} state={'selected'} />
                                <SkillComponents text={'ttt'} state={'selected'} />
                                <SkillComponents text={'ttt'} state={'selected'} />
                                <SkillComponents text={'ttt'} state={'selected'} />
                                <SkillComponents text={'ttt'} state={'selected'} />
                            </View>
                        </View>
                    ) : (
                        <View style={[styles.card, styles.cardShadow]}>
                            <Text>Aucun autre profil</Text>
                        </View>
                    )}

                />
                <View style={styles.actions}>
                    <TouchableOpacity
                        onPress={() => swipeRef.current.swipeLeft()}
                        style={[styles.actionsButton, styles.shadow]}
                    >
                        <Svg
                            width={30}
                            height={30}
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <Path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M23.564 8.064a1.15 1.15 0 0 0-1.626-1.628L15 13.374 8.064 6.436a1.151 1.151 0 0 0-1.628 1.628L13.374 15l-6.938 6.936a1.151 1.151 0 1 0 1.628 1.628L15 16.626l6.938 6.938a1.15 1.15 0 1 0 1.626-1.628L16.626 15l6.938-6.936Z"
                                fill="#E94045"
                            />
                        </Svg>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.actionsButton, styles.actionSeeButton, styles.shadow]} onPress={()=>{
                        // console.log(imageUrl)
                    }}>
                        <Svg
                            width={30}
                            height={30}
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <Path
                                d="M15 8.125A12.212 12.212 0 0 1 26.025 15 12.199 12.199 0 0 1 15 21.875c-4.75 0-8.963-2.663-11.025-6.875A12.212 12.212 0 0 1 15 8.125Zm0-2.5C8.75 5.625 3.412 9.512 1.25 15c2.163 5.488 7.5 9.375 13.75 9.375S26.587 20.488 28.75 15C26.587 9.512 21.25 5.625 15 5.625Zm0 6.25a3.125 3.125 0 1 1 0 6.25 3.125 3.125 0 0 1 0-6.25Zm0-2.5A5.633 5.633 0 0 0 9.375 15c0 3.1 2.525 5.625 5.625 5.625S20.625 18.1 20.625 15 18.1 9.375 15 9.375Z"
                                fill="#54ADFA"
                            />
                        </Svg>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => swipeRef.current.swipeRight()}
                        style={[styles.actionsButton, styles.shadow]}
                    >
                        <Svg
                            width={55}
                            height={55}
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <Path
                                d="m23.75 39.542-10-10 3.5-3.5 6.5 6.5 16.5-16.5 3.5 3.5-20 20Z"
                                fill="#44AB6F"
                            />
                        </Svg>
                    </TouchableOpacity>
                </View>
            </View>

        </SafeAreaView>
    )
}