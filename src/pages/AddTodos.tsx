import { useTheme } from '@react-navigation/native';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Text, View, TextInput, StyleSheet, Switch, TouchableOpacity, Alert } from 'react-native'
import LButton from '../components/LButton';
import { task } from '../store/tasksContext';
import DatePicker from 'react-native-date-picker'
import Edit from '../assets/edit.svg'

import { TaskContext } from '../store/tasksContext';

//Debouncing done by using setTimeout and Clearing it before it is completed check line 57

const AddTodos = ({ navigation }: any) => {
  const theme = useTheme();
  const [endDate, setendDate] = useState(new Date(Date.now()));
  const [repeat, setRepeat] = useState<boolean>(false);
  const [editTitle, setEditTitle] = useState<boolean>(true);
  const [title, setTitle] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [points, setPoints] = useState<number>(1);
  const titleRef = useRef<TextInput>(null);
  const desRef = useRef<TextInput>(null);
  const pointRef = useRef<TextInput>(null);
  const [open, setOpen] = useState(false);
  let timeout: any;

  const context = useContext(TaskContext)

  useEffect(() => {
    if (editTitle) {
      titleRef.current?.focus()
    }
  }, [editTitle]);
  const AddTask = () => {
    if (title !== "") {
      const task: task = {
        taskName: title,
        taskId: Date.now(),
        description: desc,
        taskCreatedDate: new Date(Date.now()),
        taskEndDate: endDate,
        reapeatable: repeat,
        points: points,
        completed: false,
      }
      context.addTask(task);
      context.checkUpdate();
      console.log(task)
      titleRef.current?.clear()
      desRef.current?.clear()
      pointRef.current?.clear()
      setEditTitle(true)
      setRepeat(false)
      setTitle('')
      setDesc("")
      setPoints(1)
      navigation.navigate("Today")
    }
    else {
      Alert.alert('Data incomplete', 'Task name not provided', [{ text: 'OK' }])
    }
  }
  return (
    <View style={styles.Container}>
      <View style={styles.header}>
        <Text style={{ color: theme.colors.text, ...styles.title }}>Add Tasks</Text>
      </View>
      <View style={{ backgroundColor: theme.colors.border, ...styles.TaskContainer }}>
        <View style={styles.TitleContainer}>
          <TextInput ref={titleRef} style={[{ color: theme.colors.primary, borderColor: theme.colors.primary, ...styles.TaskTitle }, editTitle ? { 'borderBottomWidth': 1 } : { 'borderBottomWidth': 0 }]}
            editable={editTitle} onBlur={() => { setEditTitle(false) }} placeholderTextColor={theme.colors.primary} placeholder="Add Task Title" onChangeText={(text) => { clearTimeout(timeout); timeout = setTimeout(() => { setTitle(text) }, 300) }} />
          <TouchableOpacity onPress={() => { setEditTitle(true) }}><Edit height={35} width={35} color={theme.colors.primary} /></TouchableOpacity>
        </View>
        <TextInput ref={desRef} style={{ color: theme.colors.primary, borderColor: theme.colors.primary, ...styles.TextLine }} placeholderTextColor={theme.colors.primary} placeholder="Task Description" onChangeText={(text) => { clearTimeout(timeout); timeout = setTimeout(() => { setDesc(text) }, 300) }} />
        <View style={{borderColor: theme.colors.primary, ...styles.datePicker}}>
          <Text style={{ color: theme.colors.primary }}>Select DeadLine</Text>
          <TouchableOpacity onPress={() => { setOpen(true) }} style={{ backgroundColor: theme.colors.card, ...styles.dateButton }}>
            <Text style={{color: theme.colors.primary,}}> {endDate.toDateString()}</Text>
          </TouchableOpacity>
          <DatePicker modal open={open} date={endDate} onConfirm={(date) => {
            setOpen(false)
            setendDate(date)
          }}
            onCancel={() => {
              setOpen(false)
            }}
            minimumDate={new Date(Date.now())} />
        </View>
        <TextInput ref={pointRef} style={{ color: theme.colors.primary, borderColor: theme.colors.primary, ...styles.TextLine }} placeholderTextColor={theme.colors.primary} placeholder="Points for Task" keyboardType="numeric" onChangeText={(text) => { clearTimeout(timeout); timeout = setTimeout(() => { setPoints(+text) }, 300) }} />
        <View style={styles.ToggleContainer}>
          <Text style={{ color: theme.colors.primary, }}>Remind Task till Deadline</Text>
          <Switch
            trackColor={{ false: theme.colors.background, true: theme.colors.background }}
            thumbColor={repeat ? theme.colors.card : theme.colors.card}
            ios_backgroundColor="#3e3e3e"
            onValueChange={setRepeat}
            value={repeat}
          />
        </View>
      </View>
      <LButton theme={theme} navigateTo={() => { AddTask() }} context={"Add Task"} />
    </View>
  )
}

const styles = StyleSheet.create({
  Container: {
    width: "100%",
    height: "100%",
    alignItems: "center"
  },
  header: {
    margin: 5,
    padding: 5
  },
  TitleContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "80%"
  },
  datePicker: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems:"center",
    padding: 10,
    margin:5,
    borderWidth:0.5,
    borderRadius:10
  },
  dateButton: {
    padding: 10,
    borderRadius: 15,
    
  },
  title: {
    fontSize: 24,
    fontWeight: "400"
  },
  TaskContainer: {
    margin: 10,
    borderRadius: 30,
    padding: 5,
    width: "80%",
  },
  TaskTitle: {
    fontSize: 30,
    borderRadius: 10,
    padding: 10,
    fontWeight: "300"
  },
  TextLine: {
    width: "100%",
    borderBottomWidth: 1,
    borderRadius: 10,
    padding: 10,
    fontWeight: "500"
  },
  ToggleContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: 10
  }
});

export default AddTodos