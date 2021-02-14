import React from 'react'
import { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Button,
    Dimensions,
    FlatList,
    Image,
    ImageBackground,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

import { useEffect } from 'react';
import moment from 'moment';
import { getOrders, doDeleteOrder } from '../api/api';
import { Portada } from '../assets/Resources'

import { Delete_Icon } from '../assets/Resources'

const { width } = Dimensions.get('window')

const OrdersList = ({ navigation, route }) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    
    const fetchOrders = () => {
        setLoading(true)
        getOrders('').then(result => {
            if (result.status === 200) {
                setOrders(result.data)
            } 
            setLoading(false)
        })
    }
    useEffect(() => {
        fetchOrders()
    }, [])

    const onDeleteOrder = (order) => {
        Alert.alert(
            'Order',
            'Do you want to delete the order?',
            [
                {text:'Delete', onPress:() => {
                    doDeleteOrder(order.Order_ID).then(result => {
                        if (result.status === 200) {
                            fetchOrders()
                        }
                    })
                }},
                {text:'Cancel', onPress:() => {
                    fetchOrders()
                }}
            ]
        )
    }

    const renderOrderItem = (order) => (
        <View style={styles.box}>
            <View style={{flex:1}}>
                <Text style={styles.label}>Crust: <Text style={styles.important}>{order.Crust}</Text></Text>
                <Text style={styles.label}>Flavor: <Text style={styles.important}>{order.Flavor}</Text></Text>
                <Text style={styles.label}>Size: <Text style={styles.important}>{order.Size}</Text></Text>
            </View>
            <View style={{flex:1}}>
                <Text style={styles.label}>Orden Id: <Text style={styles.important}>{order.Order_ID}</Text></Text>
                <Text style={styles.label}>Table No: <Text style={styles.important}>{order.Table_No}</Text></Text>
                <Text style={styles.label}>Date: <Text style={[styles.important, {fontSize:14}]}>{moment(order.Timestamp).format('lll')}</Text></Text>
            </View>  
            <View style={styles.center}>
                <TouchableOpacity onPress={() => onDeleteOrder(order)}>
                    <Image 
                        source={Delete_Icon}
                        style={{width:30, height:30}}
                    />
                </TouchableOpacity>
            </View>          
        </View>
    )
    return (
        <SafeAreaView style={styles.main}>
            <ImageBackground
                source={Portada}
                style={[{ flex: 1 }]}
            >
                <FlatList 
                    data={orders}
                    renderItem={({item}) => renderOrderItem(item)}
                    ListFooterComponent={
                        <View>
                            {
                                loading ? 
                                <ActivityIndicator size="large" color="#00ff00" /> : null
                            }
                        </View>
                    }
                />
            </ImageBackground>
        </SafeAreaView>
    )
};

export default OrdersList

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: 'white',
    },
    input: {
        borderWidth: 0.5,
        borderColor: 'green'
    },
    box: {        
        flex:1,
        flexDirection:'row',
        backgroundColor: '#f0f0f0',
        padding: 10,
        margin: 10,
        borderRadius: 10,
    },
    label: {
        fontSize:12,
        color:'gray',
        color:'black'
    },
    important: {
        fontSize:16,
        fontWeight: 'bold'
    },
    center: {
        justifyContent:'center',
        alignItems:'center'
    }


})