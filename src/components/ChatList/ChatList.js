import React, { useEffect, useState } from 'react'
import { Text, View, FlatList } from 'react-native'
import { firebase } from "../../firebase/config";
import { onSnapshot } from 'firebase/firestore';
import ChatRow from '../ChatRow/ChatRow';
import styles from './styles';

export default function ChatList({startNewChat}) {
    const [matches, setMatches] = useState([]);
    const user = firebase.auth().currentUser;
    const [imageUrl, setImageUrl] = useState([]);

    useEffect(() => {
        onSnapshot(firebase.firestore().collection("matches")
        .where("usersMatched", "array-contains", user.uid), (snapshot) => {
            setMatches(
                snapshot.docs.map((doc) => (
                    {
                        id: doc.id,
                        ...doc.data(),
                    }
                ))
            );
        })
    }, [user]);

    return matches.length > 0 ? (
        !startNewChat ? (
        <FlatList
            data={matches}
            keyExtractor={item => item.id}
            renderItem={({item}) => <ChatRow matchDetails={item}/>}
        /> ) : ( <Text>New chat</Text> )
    ) : (
        <Text style={{color: '#fff'}}>Aucune conversation de disponible pour le moment.</Text>
    );
}