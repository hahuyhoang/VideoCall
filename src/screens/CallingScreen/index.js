/* eslint-disable prettier/prettier */
import { View, Text, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import CallActionBox from '../../Components/CallActionBox';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/core';
const CallingScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const user = route?.params?.user;
  const goBack = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.page}>
      <Pressable onPress={goBack} style={styles.buttonBack}>
        <Ionicons name="chevron-back" color="white" size={30} />
      </Pressable>
      <View style={styles.cameraPreview}>
        <Text style={styles.name}>{user?.user_display_name}</Text>
        <Text style={styles.phoneNumber}>ringing +123 334 423 113</Text>
      </View>
      <CallActionBox />
    </View>
  );
};

export default CallingScreen;
const styles = StyleSheet.create({
  page: {
    height: '100%',
    backgroundColor: '#7b4e80',
  },
  cameraPreview: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 10,
  },
  name: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 50,
    marginBottom: 15,
  },
  phoneNumber: {
    fontSize: 20,
    color: 'white',
  },
  buttonContainer: {
    backgroundColor: '#333',
    padding: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconButton: {
    backgroundColor: '#4a4a4a',
    padding: 15,
    borderRadius: 50,
  },
  buttonBack: {
    position: 'absolute',
    padding: 10,
    zIndex: 10,
  },
});
