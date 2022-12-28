/* eslint-disable prettier/prettier */
import {StyleSheet, View} from 'react-native';
import React from 'react';
import CallActionBox from '../../Components/CallActionBox';

const CallScreen = () => {
  return (
    <View style={styles.page}>
      <View style={styles.cameraPreview}/>
      <CallActionBox />
    </View>
  );
};

export default CallScreen;

const styles = StyleSheet.create({
  page: {height: '100%', backgroundColor: '#7b4e80'},
  cameraPreview: {
    // flex: 1,
    width: 100,
    height: 150,
    backgroundColor: '#ffff6e',
    position: 'absolute',
    right: 10,
    top: 50,
    borderRadius: 10
  },
});
