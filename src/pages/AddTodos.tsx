import { useTheme } from '@react-navigation/native';
import React, { useState } from 'react'
import { Text, View, TextInput, StyleSheet } from 'react-native'
import LButton from '../components/LButton';
import { task } from '../store/tasksContext';
import DatePicker from 'react-native-date-picker'

const AddTodos = ({navigation}:any) => {
  const theme = useTheme();
  const [task, setTask] = useState<task>()
  const [endDate, setendDate] = useState(new Date())
  return (
    <View style={styles.Container}>
      <View style={styles.header}>
        <Text style={{color: theme.colors.text, ...styles.title}}>Add Tasks</Text>
      </View>
      <View style={{backgroundColor: theme.colors.border, ...styles.TaskContainer}}>
        <TextInput style={{color: theme.colors.text, ...styles.TaskTitle}} placeholderTextColor={"#F0ECF8"} placeholder="Task Title" />
        <TextInput style={{color: theme.colors.text}} placeholderTextColor={"#F0ECF8"} placeholder="Task Description" />
        <DatePicker date={endDate} onDateChange={setendDate} fadeToColor={theme.colors.border} />
        <TextInput style={{color: theme.colors.text}} placeholderTextColor={"#F0ECF8"} placeholder="Points for Task" keyboardType="numeric"/>
      </View>
      <LButton theme={theme} navigateTo={()=>{navigation.navigate("Today")}} context={"Add Task"}/>
    </View>
  )
}

const styles = StyleSheet.create({
  Container:{
    width: "100%",
    height: "100%",
    alignItems:"center"
  },
  header:{
    margin:5,
    padding:5
  },
  title:{
    fontSize: 24,
    fontWeight: "400"
  },
  TaskContainer:{
    margin: 10,
    borderRadius: 30,
    padding: 5,
    width: "80%",
  },
  TaskTitle:{
    fontSize: 20
  }
});

export default AddTodos