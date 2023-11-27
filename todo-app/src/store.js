import {configureStore} from "@reduxjs/toolkit"
import taskReducer from "./reducers/taskReducers"



export const store = configureStore({
  reducer: {
    task: taskReducer, // assuming "task" is your tasks-related state slice

  },
});