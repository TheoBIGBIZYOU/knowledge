import React from 'react'
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native'
import styles from './styles';
import Svg, {Path} from "react-native-svg";

export default function MenuComponents({navigation,props}) {

    return (
        <SafeAreaView>
            <View style={styles.bottomNav}>
                <TouchableOpacity onPress={() =>
                    navigation.navigate('Home')
                }>
                    <Svg
                        width={30}
                        height={30}
                        viewBox="0 0 30 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        {...props}
                    >
                        <Path
                            d="M12.5 15a5 5 0 100-10 5 5 0 000 10zM12.938 17.512C9.524 17.387 2.5 19.087 2.5 22.5V25h11.925c-3.088-3.45-1.538-7.363-1.488-7.488zm11.35 5.013c.45-.737.712-1.6.712-2.525 0-2.762-2.238-5-5-5s-5 2.238-5 5 2.238 5 5 5c.925 0 1.788-.275 2.525-.712l3.213 3.212 1.762-1.762-3.212-3.213zM20 22.5a2.507 2.507 0 01-2.5-2.5c0-1.375 1.125-2.5 2.5-2.5s2.5 1.125 2.5 2.5-1.125 2.5-2.5 2.5z"
                            fill="#fff"
                        />
                    </Svg>
                </TouchableOpacity>

                <TouchableOpacity onPress={() =>
                    navigation.navigate('Chat')
                }
                  style={styles.iconMiddle}
                >
                    <Svg
                        width={30}
                        height={30}
                        viewBox="0 0 30 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        {...props}
                    >
                        <Path
                            d="M15 3.75c6.875 0 12.5 4.475 12.5 10s-5.625 10-12.5 10c-1.55 0-3.037-.225-4.412-.625C6.938 26.25 2.5 26.25 2.5 26.25c2.912-2.913 3.375-4.875 3.438-5.625C3.813 18.837 2.5 16.413 2.5 13.75c0-5.525 5.625-10 12.5-10z"
                            fill="#fff"
                        />
                    </Svg>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Svg
                        width={30}
                        height={30}
                        viewBox="0 0 30 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        {...props}
                    >
                        <Path
                            d="M15 5a5 5 0 110 10 5 5 0 010-10zm0 12.5c5.525 0 10 2.238 10 5V25H5v-2.5c0-2.762 4.475-5 10-5z"
                            fill="#fff"
                        />
                    </Svg>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}