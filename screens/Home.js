import React, { useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome, Entypo } from '@expo/vector-icons';

import colors from '../colors';
const catImageUrl =
  'https://i.guim.co.uk/img/media/26392d05302e02f7bf4eb143bb84c8097d09144b/446_167_3683_2210/master/3683.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=49ed3252c0b2ffb49cf8b508892e452d';
const backImage = require('../assets/smokeBackImage.jpg');

export default function Home() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <FontAwesome
          name="search"
          size={24}
          color={colors.gray}
          style={{ marginLeft: 15 }}
        />
      ),
      headerRight: () => (
        <Image
          source={{ uri: catImageUrl }}
          style={{
            width: 40,
            height: 40,
            marginRight: 15,
            borderRadius: 10,
            overflow: 'hidden',
            borderWidth: 2,
            borderColor: colors.primary,
          }}
        />
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ImageBackground source={backImage} style={styles.backImage} />
      <View style={styles.whiteSheet} />
      <View>
        <Text style={styles.welcomeText}>Welcome</Text>
      </View>
      <View>
        <Text style={styles.massChat}>Mass Chat Room</Text>
      </View>
      <TouchableOpacity
        style={styles.chatButton}
        onPress={() => navigation.navigate('Chat')}
      >
        <Entypo name="chat" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  backImage: {
    width: '100%',
    height: 340,
    position: 'absolute',
    top: 0,
    resizeMode: 'cover',
  },
  whiteSheet: {
    width: '100%',
    height: '20%',
    position: 'absolute',

    backgroundColor: '#fff',
    borderTopLeftRadius: 60,
  },
  chatButton: {
    position: 'absolute',
    bottom: 50,
    right: 0,

    backgroundColor: colors.primary,
    height: 100,
    width: 100,
    borderRadius: 50,

    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
    marginRight: 20,
    marginBottom: 100,
  },
  welcomeText: {
    fontSize: 50,
    fontWeight: 'bold',
    color: colors.primary,
    alignSelf: 'center',
    position: 'absolute',
    top: -250,
  },
  massChat: {
    fontSize: 30,
    fontWeight: 'bold',
    color: colors.primary,
    alignSelf: 'center',
    position: 'absolute',
    top: -200,
  },
});
