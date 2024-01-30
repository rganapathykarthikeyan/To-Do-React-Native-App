import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const LButton = (props: any) => {
  return (
    <View style={styles.footer}>
        <TouchableOpacity style={{backgroundColor:props.theme.colors.card, ...styles.button}} onPress={props.navigateTo}><Text style={{color: props.theme.colors.primary, ...styles.buttontxt}}>{props.context}</Text></TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    footer:{
        width: "90%",
        alignItems:"center"
    },
    button: {
        width: "80%",
        padding: 10,
        borderRadius: 40,
        alignItems: "center"
    },
    buttontxt:{
        fontSize: 18,
        fontWeight: "bold"
    }
})

export default LButton