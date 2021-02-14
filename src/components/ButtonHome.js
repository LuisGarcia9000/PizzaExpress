import React from "react";
import { 
    StyleSheet, 
    Text, 
    TouchableOpacity, 
    View,
    Dimensions
 } from "react-native";
 
 const {width} = Dimensions.get("window")

const ButtonHome = ({label, onPress, icon}) => {
 return (
     <TouchableOpacity onPress={() => onPress ? onPress(): null}>
        <View style={styles.button}>
            {
                icon ? icon : null
            }
            <Text style={styles.label}>{label}</Text>
        </View>
     </TouchableOpacity>
 )
};

export default ButtonHome

const styles = StyleSheet.create({
    button: {
        width: width *0.4,
        borderColor: "lightgray",
        borderWidth:1,
        backgroundColor: 'orange',
        paddingVertical:10,
        borderRadius:5,
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
        marginVertical:10
    },
    label: {
        fontSize:18,  
        fontWeight:'bold',
        color:'white',
        textAlign:'center'      
    }
})