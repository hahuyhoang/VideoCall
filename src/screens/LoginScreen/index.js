/* eslint-disable prettier/prettier */
import { Pressable, StyleSheet, Text, TextInput, View, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Voximplant } from 'react-native-voximplant';
import { ACC_NAME, APP_NAME } from '../../Constans';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const voximplant = Voximplant.getInstance();
    const navigation = useNavigation();
    useEffect(() => {
        const connect = async () => {
            const status = await voximplant.getClientState();
            if (status === Voximplant.ClientState.DISCONNECTED) {
                await voximplant.connect();
            } else if (status === Voximplant.ClientState.LOGGED_IN) {
                redirectHome();
            }
        };
        connect();
    }, []);
    const signIn = async () => {
        try {
            const fqUsername = `${username}@${APP_NAME}.${ACC_NAME}.voximplant.com`;
            await voximplant.login(fqUsername, password);
            redirectHome();
        } catch (e) {
            console.log(e);
            Alert.alert(e.name, `Error code: ${e.code}`);

        }
    };
    const redirectHome = () => {
        navigation.reset({
            index: 0,
            routes: [
                {
                    name: 'Contacts'
                }
            ]
        })
    }
    return (
        <View style={styles.page}>
            <TextInput
                value={username}
                placeholder="username"
                style={styles.input}
                onChangeText={setUserName}
                autoCapitalize="none"
            />
            <TextInput
                placeholder="password"
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <Pressable style={styles.button} onPress={signIn}>
                <Text>
                    Sign In
                </Text>
            </Pressable>
        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    page: {
        padding: 10,
        alignItems: 'stretch',
        flex: 1,
        justifyContent: 'center'
    },
    input: {
        backgroundColor: 'white',
        padding: 10,
        marginVertical: 10,
        borderRadius: 5
    },
    button: {
        backgroundColor: 'dodgerblue',
        marginVertical: 10,
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',

    },
})