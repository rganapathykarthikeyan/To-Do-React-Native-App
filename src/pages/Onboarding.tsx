import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme} from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LButton from '../components/LButton';

const Onboarding = ({navigation}:any) => {
    const theme = useTheme();
    const monthList = ['January',"February", "March", "April", "May","June", "August","September","October","November","December"];
    const today = new Date(Date.now());
    const date:number = today.getDate();
    const month:number = today.getMonth();
    const monthName: string = monthList[month]
    const year:number = today.getFullYear();
    return (
        <SafeAreaView style={{backgroundColor: theme.colors.background, ...styles.pageContainer}}>
            <View style={styles.dateContainer}>
                <Text style={{color: theme.colors.text, ...styles.date}}>{date}</Text>
                <Text style={{color: theme.colors.text, ...styles.month}}>{monthName}</Text>
                <Text style={{color: theme.colors.text, ...styles.year}}>{year}</Text>
            </View>
            <LButton theme={theme} navigateTo={()=>{navigation.navigate("TabNavigations")}} context={"Today's Tasks"}/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    pageContainer:{
        height:"100%", 
        justifyContent:"center",
        alignItems:"center"
    },
    dateContainer:{
        alignItems:"center",
        justifyContent:"center",
        height: "80%",
    },
    date:{
        fontSize: 70,
        fontWeight: "300"
    },
    month:{
        fontSize: 32,
        fontWeight: "bold"
    },
    year:{
        fontSize: 30,
        fontWeight: "bold"
    },
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
    
});

export default Onboarding;

