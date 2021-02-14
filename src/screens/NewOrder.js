import React from 'react'
import { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Button,
    Dimensions,
    ImageBackground,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View
} from 'react-native';

import { Portada } from '../assets/Resources'

import { doCreateOrder } from '../api/api';

const { width, height } = Dimensions.get('window')

const CreateOrder = ({ navigation, route }) => {
    const [crust, setCrust] = useState('');
    const [flavor, setFlavor] = useState('');
    const [orderId, setOrderId] = useState('');
    const [size, setSize] = useState('');
    const [tableNo, setTableNo] = useState('');

    const [processing, setProcessing] = useState(false)

    const onCreateOrder = () => {

        if(!crust) {
            alert('Crust is required')
            return
        }
        if(!flavor) {
            alert('Flavor is required')
            return
        }
        if(!size) {
            alert('Size is required')
            return
        }

        let tableNoAsNumber = Number(tableNo)
        let orderIdAsNumber = Number(orderId)
        if (!tableNo || Number.isNaN(tableNoAsNumber)) {
            alert('Table No invalid, only numbers are valid.')
            return
        }
        if (!orderId || Number.isNaN(orderIdAsNumber)) {
            alert('Order Id invalid, only numbers are valid.')
            return
        }
        setProcessing(true)
        let orderData = {
            Crust: crust,
            Flavor: flavor,
            Order_ID: Number(orderId),
            Size: size,
            Table_No: Number(tableNo),
            Timestamp: new Date().toISOString()
        }
        doCreateOrder(orderData, route.params.accessToken).then(result => {
            setProcessing(false)
            if (result.status === 201) {
                Alert.alert(
                    'PizzaExpress',
                    'Order sended successesfuly.',
                    [{ text: 'Ok', onPress: () => navigation.goBack() }])
            } else {
                Alert.alert(
                    'PizzaExpress',
                    `There was a problem creating your order.\n${result.data.msg}`,
                    [{ text: 'Ok', onPress: () => console.log('.', result.data) }])
            }
        })
    }
    return (
        <SafeAreaView style={styles.main}>
            <ImageBackground
                source={Portada}
                style={[styles.center, { flex: 1 }]}
            >
                <ScrollView>
                    <View style={styles.box}>
                        <Text>Crust:</Text>
                        <TextInput
                            style={styles.input}
                            value={crust}
                            onChangeText={(text) => setCrust(text)}
                        />
                        <Text>Flavor:</Text>
                        <TextInput
                            style={styles.input}
                            value={flavor}
                            onChangeText={(text) => setFlavor(text)}
                        />
                        <Text>Size:</Text>
                        <TextInput
                            style={styles.input}
                            value={size}
                            onChangeText={(text) => setSize(text)}
                        />
                        <Text>Table No:</Text>
                        <TextInput
                            style={styles.input}
                            keyboardType="number-pad"
                            value={tableNo}
                            onChangeText={(text) => setTableNo(text)}
                        />
                        <Text>Order Id:</Text>
                        <TextInput
                            style={styles.input}
                            keyboardType="number-pad"
                            value={orderId}
                            onChangeText={(text) => setOrderId(text)}
                        />

                        <View style={{ marginVertical: 20 }}>
                        {
                            processing ? 
                                <ActivityIndicator size="large" color="#00FF00" />
                            :
                                <Button
                                    title="Send"
                                    onPress={() => onCreateOrder()}
                                />
                        }                            
                        </View>
                    </View>
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    )
};

export default CreateOrder

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
        marginVertical: 40,
        width: width * 0.8,
        backgroundColor: '#f0f0f0',
        padding: 10,
        borderRadius: 10
    }

})