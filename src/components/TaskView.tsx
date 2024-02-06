import React, { useState } from 'react'
import { View, Text, StyleSheet, Animated, TouchableOpacity, Switch } from 'react-native'

import { task } from '../store/tasksContext'
import { useTheme } from '@react-navigation/native'
import Deadline from '../assets/deadline.svg'

interface TaskProps {
    task: task
}

const TaskView: React.FunctionComponent<TaskProps> = ({ task }) => {
    const theme = useTheme();
    const [expand, setExpand] = useState(false);
    const [completed, setCompleted] = useState(task.completed)
    const date = task.taskEndDate.toDateString();
    const today = new Date(Date.now()).toDateString();
    const time = task.taskEndDate.toLocaleTimeString();

    return (
        <TouchableOpacity style={{ backgroundColor: theme.colors.border, ...styles.TaskContainer }} onPress={() => { setExpand(pre => !pre) }}>
            <View style={styles.taskMini}>
                <Text>{task.taskName}</Text>
                <View style={styles.deadline}>
                    <Deadline height={20} width={20} color={theme.colors.primary} />
                    {date === today ? <Text>Today:{time}</Text> : <Text>{date}</Text>}
                </View>
                <Text>+{task.points}</Text>
            </View>
            {expand && <View style={styles.showFullTask}>
                <Text>{task.description === "" ? "Description Not Provided" : task.description}</Text>
                <View style={styles.footer}>
                    <Text>{task.reapeatable ? "Repeated Task" : ""}</Text>
                    <View style={styles.completedSwitch}>
                        <Text>Task Completed: </Text>
                        <Switch
                            trackColor={{ false: theme.colors.background, true: theme.colors.background }}
                            thumbColor={completed ? theme.colors.card : theme.colors.card}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={setCompleted}
                            value={completed}
                        />
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
    deadline: {
        flexDirection: "row"
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
        justifyContent: "space-between"
    }
})

export default TaskView