import React from 'react'
import { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Button,
    Dimensions,
    ImageBackground,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    View
} from 'react-native';

import { Portada } from '../assets/Resources'

import { doLogin } from '../api/api';

const { width } = Dimensions.get('window')

const Login = ({ navigation, route }) => {

    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [processing, setProcessing] = useState(false)

    const onLoginPress = () => {
        let loginData = {
            username,
            password
        }
        setProcessing(true)
        doLogin(loginData).then(result => {
            setProcessing(false)
            if (result.status === 200) {
                if (route.params.onLoginSuccess) {
                    route.params.onLoginSuccess(result.data.access_token)
                    navigation.goBack()
                }
            } else {
                Alert.alert('Login error', result.data.msg)
            }
        })
    }

    return (
        <SafeAreaView style={styles.main}>
            <ImageBackground
                source={Portada}
                style={[styles.center, { flex: 1 }]}
            >
                <View style={styles.box}>
                    <Text>user:</Text>
                    <TextInput
                        style={styles.input}
                        value={username}
                        onChangeText={(text) => setUserName(text)}
                    />
                    <Text>Password:</Text>
                    <TextInput
                        style={styles.input}
                        secureTextEntry={true}
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                    />

                    <View style={{ marginVertical: 10 }}>
                        {
                            processing ? 
                                <ActivityIndicator size="large" color="#00FF00" />
                            :
                                <Button
                                    title="Login"
                                    onPress={() => onLoginPress()}
                                />
                        }
                    </View>
                </View>
            </ImageBackground>
        </SafeAreaView>
    )
};

export default Login

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: 'white',
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        borderWidth: 1,
        borderColor: 'lightgray'
    },
    box: {
        width: width * 0.7,
        backgroundColor: '#f0f0f0',
        padding: 10,
        borderRadius: 10
    }

})