//This is to provide Default Values to the Context

import { useState } from "react";
import { TaskContext, task } from "./tasksContext";

import AsyncStorage from '@react-native-async-storage/async-storage';
//AsyncStorage can only store Strings So we Stringify and Parse it while setting and getting the data


const TaskProvider = (props:any)=>{
    const [taskList, setTaskList] = useState<task[]>([]);
    const [updated, setUpdated] = useState<boolean>(false)
    const addTasks = (newtask: task) => {
        const newL = JSON.stringify([...taskList, newtask])
        setTaskList((pre)=>{ return [...pre, newtask]})
        AsyncStorage.setItem('TaskList', newL);
    }
    const removeTasks = (taskid: number) => {
        const filteredList:task[] = taskList.filter((task)=>task.taskId !== taskid)
        const fiteredL:string = JSON.stringify(filteredList);
        setTaskList(filteredList);
        AsyncStorage.setItem('TaskList', fiteredL);
        setUpdated(true);
    }
    const checkUpdate = () => {
        setUpdated(pre => !pre);
    }
    const getTaskList = async (totalList:task[]) => {
        setTaskList(totalList);
    }
    const taskContext = {
        tasksList: taskList,
        updatedList: updated,
        checkUpdate: checkUpdate,
        getTaskList: getTaskList,
        addTask: addTasks,
        removeTask: removeTasks,
    }
    return(
        <TaskContext.Provider value={taskContext}>
            {props.children}
        </TaskContext.Provider>
    )
}

export default TaskProvider;