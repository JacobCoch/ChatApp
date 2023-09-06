import React, { useEffect, useState } from 'react';
import { View, FlatList, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { collection, getDocs } from 'firebase/firestore';
import { database } from '../config/firebase';
export default function UserList() {
  const [users, setUsers] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const getUsersFromFirebase = async () => {
      try {
        const usersCollection = collection(database, 'profiles');
        const querySnapshot = await getDocs(usersCollection);

        const userList = [];
        querySnapshot.forEach((doc) => {
          const userData = doc.data();
          userList.push(userData);
        });

        return userList;
      } catch (error) {
        console.error('Error fetching users from Firebase:', error);
        return [];
      }
    };

    // Fetch the list of users from Firebase and update the state
    const fetchUsers = async () => {
      const userList = await getUsersFromFirebase(); // Replace with your function
      setUsers(userList);
    };

    fetchUsers();
  }, []);

  const navigateToChat = (user) => {
    navigation.navigate('Chat', {
      recipient: user,
    });
  };

  return (
    <View>
      <FlatList
        data={users}
        keyExtractor={(user) => user.uid}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigateToChat(item)}>
            <View>
              <Text>{item.email}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
