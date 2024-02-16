import React, { useState } from 'react'
import { View, Text, StyleSheet, Animated, TouchableOpacity, Switch } from 'react-native'

import { task } from '../store/tasksContext'
import { useTheme } from '@react-navigation/native'
import Deadline from '../assets/deadline.svg'
import Delete from '../assets/dustBin.svg'

interface TaskProps {
    task: task,
    deleteTask: (taskid:number) => void;
    update: (taskId:number, taskState:boolean) => void;
    complete: boolean;
}

const TaskView: React.FunctionComponent<TaskProps> = ({ task, deleteTask, complete , update }) => {
    const theme = useTheme();
    const [expand, setExpand] = useState(false);
    const [completed, setCompleted] = useState(task.completed)
    const date = new Date(task.taskEndDate).toDateString();
    const today = new Date(Date.now()).toDateString();
    const time = new Date(task.taskEndDate).toLocaleTimeString();
    const ncolor = theme.dark ? "#5C8374" : "#C3ACD0"
    const ccolor =  theme.dark ? "#183D3D" : "#7743DB"
    const color = complete ? ccolor : ncolor;

    const onUpdate = () =>{
        const state = completed
        setCompleted(pre => !pre);
        update(task.taskId, !state);
    }

    return (
        <TouchableOpacity style={{ backgroundColor: color, ...styles.TaskContainer }} onPress={() => { setExpand(pre => !pre) }}>
            <View style={styles.taskMini}>
                <Text style={styles.text}>{task.taskName}</Text>
                <View style={styles.deadline}>
                    <Deadline height={20} width={20} color={"#FFFBF5"} />
                    {date === today ? <Text style={styles.text}>Today:{time}</Text> : <Text style={styles.text}>{date}</Text>}
                </View>
                <Text style={styles.text}>{complete ? "Completed" : "+" + task.points}</Text>
            </View>
            {expand && <View style={styles.showFullTask}>
                {task.description && <View style={styles.description}>
                    <Text style={styles.text}>{task.description}</Text>
                </View>}
                <View style={styles.footer}>
                    <Text style={styles.text}>{task.reapeatable ? "Daily Task" : "Single Task"}</Text>
                    <View style={styles.completedSwitch}>
                        <Text style={styles.text}>Task Completed: </Text>
                        <Switch
                            trackColor={{ false: theme.colors.background, true: theme.colors.background }}
                            thumbColor={completed ? theme.colors.card : theme.colors.card}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={onUpdate}
                            value={completed}
                        />
                    </View>
                    <View>
                        <TouchableOpacity onPress={()=>{deleteTask(task.taskId)}}><Delete height={20} width={20} color={theme.colors.primary} /></TouchableOpacity>
                    </View>
                </View>

            </View>}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    TaskContainer: {
        margin: 5,
        padding: 10,
        borderRadius: 10
    },
    taskMini: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    showFullTask: {
        paddingTop: 10,

    },
    text:{
        color:"#FFFBF5",
    },
    deadline: {
        flexDirection: "row"
    },
    description:{
        padding:5,
        
    },
    completedSwitch: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end"
    },
    footer: {
        flexDirection: "row",
        padding: 5,
        alignItems: 'center',
        justifyContent: "space-between",
        borderWidth: 0.5,
        borderRadius:10,

    }
})

export default TaskView