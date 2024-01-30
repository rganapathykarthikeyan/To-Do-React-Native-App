//This is to provide Default Values to the Context

import { useState } from "react";
import { TaskContext, task } from "./tasksContext";

const TaskProvider = (props:any)=>{
    const [taskList, setTaskList] = useState<task[]>([]);
    const addTasks = (newtask: task) => {
        setTaskList((pre)=>{ return [...pre, newtask]})
    }
    const removeTasks = (taskid: number) => {
        const filteredList:task[] = taskList.filter((task)=>{task.taskId !== taskid})
        setTaskList(filteredList)
    }
    const taskContext = {
        tasksList: taskList,
        getTaskList: () => {},
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