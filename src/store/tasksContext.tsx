import { createContext } from "react";
//This is the Default contents in context for easy auto completions

export interface task {
    taskName: string,
    taskId: number,
    description: string,
    taskCreatedDate: Date,
    taskEndDate: Date,
    reapeatable: boolean,
    points: number,
    completed: boolean,
}

const taskList:task[] = []

export const TaskContext = createContext({
    tasksList: taskList,
    updatedList:true,
    checkUpdate:  () => {},
    getTaskList: (totalList:task[]) => {},
    addTask: (tasks:task) => {},
    removeTask: (taskid:number) => {},
});