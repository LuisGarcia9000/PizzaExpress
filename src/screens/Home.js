import React from 'react'
import { useState } from 'react';
import {
    Button,
    Dimensions,
    Image,
    ImageBackground,
    SafeAreaView,
    StyleSheet,
    Text,
    View
} from 'react-native';

import { Portada } from '../assets/Resources'
import ButtonHome from '../components/ButtonHome';

const { width, height } = Dimensions.get('window')

const HomeScreen = ({ navigation }) => {

    const [accessToken, setAccessToken] = useState(null)

    const onLoginSuccess = (access_token) => {
        setAccessToken(access_token)
    }

    const onCloseSession = () => {
        setAccessToken(null)
    }

    const viewWithSession = accessToken ?
        (
            <View style={{ flex: 1 }}>
                <Text style={{color:'white'}}>Welcome...</Text>
                <View style={{ flex: 1 }}>
                    <View style={[styles.center, { flex: 1 }]}>
                        <ButtonHome
                            label="Order Now"
                            onPress={() => navigation.navigate("NewOrderScreen", { accessToken })}
                        />

                        <ButtonHome
                            label="Show Orders"
                            onPress={() => navigation.navigate("OrdersListScreen", { accessToken })}
                        />
                    </View>

                    <View>
                        <Button
                            title="Logout"
                            onPress={() =>
                                onCloseSession()
                            }
                        />
                    </View>

                </View>
            </View>
        ) :
        (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                </View>
                <Button
                    title="Login"
                    onPress={() =>
                        navigation.navigate('LoginScreen', { onLoginSuccess })
                    }
                />
            </View>
        )
    return (
        <SafeAreaView style={styles.main}>
            <ImageBackground
                source={Portada}
                style={[{ flex: 1 }]}
            >
                {
                    viewWithSession
                }
            </ImageBackground>
        </SafeAreaView>
    );
};

export default HomeScreen

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: 'white',
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    }

})