import React, { useEffect, useState } from 'react'
import { Text, View, Image } from 'react-native'
import styles from './styles';
import { firebase } from "../../firebase/config";

export default function ReceiverMessage({ message }) {
    const [imageUrl, setImageUrl] = useState(null);
    const storage = firebase.storage();

    useEffect(() => {
        const fetchImage = async () => {
            try {
              const gsUrl = `gs://knowledge-cf905.appspot.com/${message.photo}`;
              console.log(gsUrl);
              const url = await storage.refFromURL(gsUrl).getDownloadURL();
              setImageUrl(url);
            } catch (error) {
              console.log('Erreur lors du chargement de l\'image :', error);
            }
        };
      
        fetchImage();
      }, []);

    return(
        <View>
            <Image
                style={styles.receiverMessageImage}
                source={{ uri: imageUrl }}
            />
            <Text style={styles.receiverMessage}>{message.message}</Text>
        </View>
    )
}