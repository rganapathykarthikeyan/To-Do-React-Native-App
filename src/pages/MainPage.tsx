import { useFocusEffect, useTheme } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Modal, Pressable } from 'react-native';
import { TaskContext, task } from '../store/tasksContext';
import TaskView from '../components/TaskView';

import { AnimatedCircularProgress } from 'react-native-circular-progress';
import AsyncStorage from '@react-native-async-storage/async-storage';

import DoubleTick from '../assets/doubleTick.svg'
import Future from '../assets/future.svg'
import ModalComp from '../components/ModalComp';

const MainPage = () => {
  const theme = useTheme();
  const context = useContext(TaskContext);
  
  const [allTasks, setAllTasks] = useState<task[]>([])
  const [todayList, setTodayList] = useState<task[]>([])
  const [completedList, setCompletedList] = useState<task[]>([])
  const [tCompletedList, setTCompletedList] = useState<task[]>([])
  const [futureList, setFutureList] = useState<task[]>([])
  const [dueList, setDueList] = useState<task[]>([])
  const [modalVisible, setModalVisible] = useState(false);
  const [compOrFuct, setCompOrFuct] = useState<string>("Completed")

  useFocusEffect(
    React.useCallback(() => {
      if (context.updatedList) {
        setAllTasks(context.tasksList)
        console.log("Done")
        context.checkUpdate()
      }
      console.log("here")
    }, [context.updatedList, modalVisible])
  )
  
  const filterTasks = () =>{
    const tl:task[] =[];
    const cl:task[] =[];
    const fl:task[] =[];
    const dl:task[] = [];
    const ctl:task[] = [];
    allTasks.map(task => {
      console.log(task.taskName, task.taskEndDate)
      if(task.completed && task.taskEndDate < new Date(new Date().getTime() + (24 * 60 * 60 * 1000))){
        context.removeTask(task.taskId);
      }
      else if(task.completed && ((task.taskEndDate === new Date(Date.now())) || task.reapeatable )){
        ctl.push(task);
      }
      else if(task.completed){
        cl.push(task);
      }
      else if(task.taskEndDate<new Date(Date.now())){
        dl.push(task);
      }
      else if(task.taskEndDate===new Date(Date.now())){
        tl.push(task);
      }
      else if(task.reapeatable === true){
        tl.push(task);
      }
      else{
        fl.push(task);
      }
    })
    console.log(ctl);
    setTodayList(tl);
    setCompletedList(cl);
    setFutureList(fl);
    setDueList(dl);
    setTCompletedList(ctl)
  }

  const setData = () => {
    const allTasksS = JSON.stringify(allTasks);
    AsyncStorage.setItem('TaskList', allTasksS);
  }

  const updateCompleted = (taskId:number, taskState:boolean) =>{
    const findIndex = allTasks.findIndex(task => task.taskId === taskId);
    allTasks[findIndex].completed = taskState;
    setData();
    filterTasks();
  }

  const getData = async() =>{
    const totalList = await AsyncStorage.getItem('TaskList');
    let allTasks = [];
        if (typeof totalList === 'string') {
            allTasks = JSON.parse(totalList)
        }
    context.getTaskList(allTasks);
    setAllTasks(allTasks)
  }

  useEffect(()=>{
    filterTasks();
  },[allTasks])

  useEffect(() => {
    getData();
  }, [])

  const deleteTask = (taskid:number) => {
    context.removeTask(taskid)
  }

  return (
    <View style={styles.Container}>
      <View style={styles.header}>
        <Text style={{ color: theme.colors.text, ...styles.title }}>Today's Tasks</Text>
      </View>
      <View style={styles.body}>
        <ScrollView>
          {todayList.map(task => <TaskView task={task} key={task.taskId} complete={false} deleteTask={deleteTask} update={updateCompleted}/>)}
          {tCompletedList.map(task => <TaskView task={task} key={task.taskId} complete={true} deleteTask={deleteTask} update={updateCompleted}/>)}
        </ScrollView>
      </View>
      <View style={styles.notify}>
        <Text>+31%</Text>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => { setCompOrFuct("Completed"); setModalVisible(true); }}>
          <DoubleTick height={20} width={20} color={theme.colors.card} />
        </TouchableOpacity>
        <View style={styles.circle}>
          <AnimatedCircularProgress
            size={150}
            width={8}
            fill={73}
            arcSweepAngle={180}
            rotation={270}
            tintColor={theme.colors.notification}
            onAnimationComplete={() => console.log('onAnimationComplete')}
            backgroundColor={theme.colors.border} />
        </View>
        <Text style={{ color: theme.colors.card, ...styles.percent }}>73%</Text>
        <TouchableOpacity onPress={() => { setCompOrFuct("Future"); setModalVisible(true); }}>
          <Future height={20} width={20} color={theme.colors.card} />
        </TouchableOpacity>
      </View>
      <ModalComp modalVisible={modalVisible} setModalVisible={setModalVisible} compOrFuct={compOrFuct} taskList={allTasks} deleteTask={deleteTask} update={updateCompleted}/>
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
  title: {
    fontSize: 24,
    fontWeight: "400"
  },
  body: {
    width: "90%",
    height: "80%",
    borderRadius: 45,
  },
  footer: {
    height: "10%",
    width: "81%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  notify: {
    height: "4%",
    padding: 1
  },
  circle: {
    position: "absolute",
    top: 0,
    left: "26%",
  },
  percent: {
    fontSize: 32,
    fontWeight: "bold"
  }
})

export default MainPage;