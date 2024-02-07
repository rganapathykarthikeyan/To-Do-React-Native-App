import { useFocusEffect, useTheme } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Modal, Pressable } from 'react-native';
import { TaskContext, task } from '../store/tasksContext';
import TaskView from '../components/TaskView';

import { AnimatedCircularProgress } from 'react-native-circular-progress';

import DoubleTick from '../assets/doubleTick.svg'
import Future from '../assets/future.svg'
import ModalComp from '../components/ModalComp';

const MainPage = () => {
  const theme = useTheme();
  const context = useContext(TaskContext);
  const [todayList, setTodayList] = useState<task[]>([])
  const [modalVisible, setModalVisible] = useState(false);
  const background = theme.dark ? "#040d129f" : "#fffbf5a2";
  const modalColor = theme.dark ? "#183d3dad" : "#7843dbad";
  const [compOrFuct, setCompOrFuct] = useState<string>("Completed")

  useFocusEffect(
    React.useCallback(() => {
      if (context.updatedList) {
        setTodayList(context.tasksList)
        console.log("Done")
        context.checkUpdate()
      }
      console.log("here")
    }, [context.updatedList])
  )

  useEffect(() => {
    context.getTaskList();
    setTodayList(context.tasksList)
  }, [])

  return (
    <View style={styles.Container}>
      <View style={styles.header}>
        <Text style={{ color: theme.colors.text, ...styles.title }}>Today's Tasks</Text>
      </View>
      <View style={styles.body}>
        <ScrollView>
          {todayList.map(task => <TaskView task={task} key={task.taskId} />)}
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
      <ModalComp modalVisible={modalVisible} setModalVisible={setModalVisible} compOrFuct={compOrFuct} taskList={todayList}/>
      {/* <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <Pressable onPress={(event) => event.target == event.currentTarget && setModalVisible(false)} style={{ backgroundColor: background, flex: 1 }}>
          <View style={{ backgroundColor: modalColor, opacity: 0.8, height: "90%", width: "100%", marginTop: "20%", borderRadius: 40 }}>
            <Text>{compOrFuct}</Text>
            <ScrollView>
              {todayList.map(task => <TaskView task={task} key={task.taskId} />)}
            </ScrollView>
          </View>
        </Pressable>
      </Modal> */}
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