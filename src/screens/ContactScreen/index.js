/* eslint-disable prettier/prettier */
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import dummyContacts from '../../../assets/data/contacts.json';
import { useNavigation } from '@react-navigation/core';
import { Voximplant } from 'react-native-voximplant';


const ContactScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredContacts, setFilteredContacts] = useState(dummyContacts);

  const navigation = useNavigation();
  const voximplant = Voximplant.getInstance();

  useEffect(() => {
    voximplant.on(Voximplant.ClientEvents.IncomingCall, incomingCallEvent => {
      navigation.navigate('IncomingCall');
    });
     return () => {
      voximplant.off(Voximplant.ClientEvents.IncomingCall);
     }
  })

  useEffect(() => {
    const newContacts = dummyContacts.filter(contact =>
      contact.user_display_name.includes(searchTerm.toLowerCase()),
    );
    setFilteredContacts(newContacts);
  }, [searchTerm]);

  const callUserItem = (user) => {
    navigation.navigate('CallingScreen', { user });
  }
  return (
    <View style={styles.page}>
      <TextInput
        value={searchTerm}
        onChangeText={setSearchTerm}
        style={styles.search}
        placeholder="Seacrh..."
      />
      <FlatList
        data={filteredContacts}
        renderItem={({ item }) => (
          <Pressable onPress={() => callUserItem(item)}>
            <Text style={styles.contactName}>{item.user_display_name}</Text>
          </Pressable>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};
export default ContactScreen;

const styles = StyleSheet.create({
  page: {
    padding: 10,
    backgroundColor: 'white',
    flex: 1
  },
  contactName: {
    fontSize: 16,
    marginVertical: 6,
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: '#f0f0f0',
  },
  search: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
  },
});
