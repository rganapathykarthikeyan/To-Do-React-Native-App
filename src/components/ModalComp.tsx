import { useTheme } from '@react-navigation/native';
import React from 'react'
import { Modal, Pressable, ScrollView, View, Text } from 'react-native'
import TaskView from './TaskView';
import { task } from '../store/tasksContext';

const ModalComp = (props:any) => {
    const theme = useTheme();
    const background = theme.dark ? "#040d129f" : "#fffbf5a2";
    const modalColor = theme.dark ? "#183d3dad" : "#7843dbad";
    const List:task[] = props.taskList;
    const comp = (props.compOrFuct === "Completed") ? true:false;
  return (
    <Modal
        animationType="slide"
        transparent={true}
        visible={props.modalVisible}
        onRequestClose={() => {
            props.setModalVisible(false);
        }}>
        {/* Pressable is used to close the modal when user presses outside of the modal. Event is used to check if its clildren is pressed */}
        <Pressable onPress={(event) => event.target == event.currentTarget && props.setModalVisible(false)} style={{ backgroundColor: background, flex: 1 }}>
          <View style={{ backgroundColor: modalColor, opacity: 0.8, height: "90%", width: "100%", marginTop: "20%", borderRadius: 40 }}>
            <Text>{props.compOrFuct}</Text>
            <ScrollView>
              {List.map(task => <TaskView task={task} key={task.taskId} deleteTask={props.deleteTask} update={props.update} complete={comp}/>)}
            </ScrollView>
          </View>
        </Pressable>
      </Modal>
  )
}

export default ModalComp