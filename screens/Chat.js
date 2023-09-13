import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
} from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import {
  collection,
  addDoc,
  orderBy,
  query,
  onSnapshot,
} from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomActions from '../components/CustomActions';
import { auth, database, storage } from '../config/firebase';
import colors from '../colors';
import MapView from 'react-native-maps';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const navigation = useNavigation();

  const onSignOut = () => {
    signOut(auth).catch((error) => console.log('Error logging out: ', error));
  };

  const renderCustomActions = (props) => {
    return <CustomActions {...props} storage={storage} />;
  };
  const renderCustomView = (props) => {
    const { currentMessage } = props;
    if (currentMessage.location) {
      return (
        <MapView
          style={styles.mapview}
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      );
    }
    return null;
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{
            marginRight: 10,
          }}
          onPress={onSignOut}
        >
          <AntDesign
            name="logout"
            size={24}
            color={colors.gray}
            style={{ marginRight: 10 }}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useLayoutEffect(() => {
    const collectionRef = collection(database, 'chats');
    const q = query(collectionRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      console.log('querySnapshot unsusbscribe');
      setMessages(
        querySnapshot.docs.map((doc) => ({
          _id: doc.data()._id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user,
        }))
      );
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const loadCachedMessages = async () => {
      try {
        const cachedMessages = await AsyncStorage.getItem('messages');
        if (cachedMessages !== null) {
          setMessages(JSON.parse(cachedMessages));
        }
      } catch (error) {
        console.log('Error loading cachedMessages:' + error);
      }
    };
    loadCachedMessages();
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );

    if (messages.length > 0) {
      const { _id, createdAt, text, user } = messages[0];
      if (text !== undefined) {
        addDoc(collection(database, 'chats'), {
          _id,
          createdAt,
          text,
          user,
        });
      } else {
        console.error('Message text is undefined');
      }
    } else {
      console.error('No messages to send');
    }
  }, []);

  return (
    // <>
    //   {messages.map(message => (
    //     <Text key={message._id}>{message.text}</Text>
    //   ))}
    // </>
    <GiftedChat
      messages={messages}
      showAvatarForEveryMessage={false}
      showUserAvatar={false}
      renderActions={renderCustomActions}
      renderCustomView={renderCustomView}
      onSend={(messages) => onSend(messages)}
      messagesContainerStyle={{
        backgroundColor: '#fff',
      }}
      textInputStyle={{
        backgroundColor: '#fff',
        borderRadius: 20,
      }}
      user={{
        _id: auth?.currentUser?.email,
        avatar: 'https://i.pravatar.cc/300',
      }}
    />
  );
}

const styles = {
  mapview: {
    width: 150,
    height: 100,
    borderRadius: 13,
    margin: 3,
    borderRadius: 20,
  },
};
