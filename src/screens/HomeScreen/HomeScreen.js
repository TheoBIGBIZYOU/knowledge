import React from 'react'
import { Text, View, Image } from 'react-native'
import Svg, { Path } from "react-native-svg";
import styles from './styles';
import SkillComponents from "../components/SkillComponents/SkillComponents";

export default function HomeScreen(props) {
    return (
        <View style={styles.container}>
            <View style={styles.background}></View>
            <Text style={styles.title}>Cherche ton mentor</Text>
            <View style={styles.card}>
                <View style={styles.shadow}>
                    <Image
                        style={styles.userImage}
                        source={{ uri: 'https://www.bigbizyou.com/media/917/download/theo2.jpg' }}
                    />
                </View>
                <Text style={styles.name}>Théo</Text>
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
                <Text style={styles.descr}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sagittis dapibus justo vel finibus. Aliquam vitae dapibus libero, non congue dui integer.</Text>
                <View style={styles.skills}>
                <SkillComponents text={'ttt'} etat={'selected'} />
                <SkillComponents text={'ttt'} etat={'enable'} />
                </View>
            </View>
        </View>
    )
}