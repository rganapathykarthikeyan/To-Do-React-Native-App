import { createContext } from "react";
//This is the Default contents in context for easy auto completions

export interface task {
    taskName: string,
    taskId: number,
    taskCreatedDate: Date,
    taskEndDate: Date,
    reapeatable: boolean,
    points: number,
}

const taskList:task[] = []

export const TaskContext = createContext({
    tasksList: taskList,
    getTaskList: () => {},
    addTask: (tasks:task) => {},
    removeTask: (taskid:number) => {},
});