/* eslint-disable prettier/prettier */
import {
  Image,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Pressable,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import bg from '../../../assets/images/ios_bg.png';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Voximplant } from 'react-native-voximplant';

const IncomingCalling = () => {
  const [caller, setCaller] = useState('')
  const navigation = useNavigation();
  const route = useRoute();
  const { call } = route.params;

  useEffect(() => {
    setCaller(call.getEndpoints()[0].displayName);

    call.on(Voximplant.CallEvents.Disconnected, callEvent => {
      navigation.navigate('Contacts');
    });


    return () => {
      call.off(Voximplant.CallEvents.Disconnected);
    }
  }, []);

  const onDecline = () => {
    call.decline()
  };
  const onAccept = () => {
    navigation.navigate('CallingScreen',
    {
      call,
      isIncomingCall: true,
    })
  };
  return (
    <View style={styles.root}>
      <ImageBackground source={bg} style={styles.bg} resizeMode="cover">
        <Text style={styles.name}>{caller}</Text>
        <Text style={styles.phoneNumber}>FaceTime video...</Text>

        <View style={[styles.row, { marginTop: 'auto' }]}>
          <View style={styles.iconsContainer}>
            <Ionicons name="alarm" size={30} color={'white'} />
            <Text style={styles.iconsText}>Remind me</Text>
          </View>
          <View style={styles.iconsContainer}>
            <Entypo name="message" size={30} color={'white'} />
            <Text style={styles.iconsText}>Message</Text>
          </View>
        </View>

        <View style={styles.row}>
          {/* Decline Button */}
          <Pressable onPress={onDecline} style={styles.iconsContainer}>
            <View style={styles.iconsButtonContainer}>
              <Feather name="x" size={40} color={'white'} />
            </View>
            <Text style={styles.iconsText}>Decline</Text>
          </Pressable>
          {/* Accept button */}
          <Pressable onPress={onAccept} style={styles.iconsContainer}>
            <View
              style={[
                styles.iconsButtonContainer,
                { backgroundColor: '#2e7bff' },
              ]}>
              <Feather name="check" size={40} color={'white'} />
            </View>
            <Text style={styles.iconsText}>Accept</Text>
          </Pressable>
        </View>
      </ImageBackground>
    </View>
  );
};

export default IncomingCalling;

const styles = StyleSheet.create({
  root: {
    height: '100%',
    backgroundColor: 'red',
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
  bg: {
    flex: 1,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  iconsContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  iconsText: {
    color: 'white',
    marginTop: 10,
  },
  iconsButtonContainer: {
    backgroundColor: 'red',
    borderRadius: 50,
    padding: 10,
    margin: 10,
  },
});
