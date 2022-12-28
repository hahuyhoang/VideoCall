import {FlatList, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import dummyContacts from '../../../assets/data/contacts.json';
const ContactScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredContacts, setFilteredContacts] = useState(dummyContacts);

  useEffect(() => {
    const newContacts = dummyContacts.filter(contact =>
      contact.user_display_name.includes(searchTerm.toLowerCase()),
    );
    setFilteredContacts(newContacts);
  }, [searchTerm]);
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
        renderItem={({item}) => (
          <Text style={styles.contactName}>{item.user_display_name}</Text>
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