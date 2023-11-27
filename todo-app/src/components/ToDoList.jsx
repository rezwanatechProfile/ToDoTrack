import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from 'nanoid';
// initial task list
// import { taskList } from "./tasks";
// material components
import { DataGrid } from "@mui/x-data-grid";
import { Button, Dialog, Paper, Typography, Checkbox } from "@mui/material";
import { addTask, editTask, removeTaskAction } from "../actions/taskActions";
import { completeTaskAction, moveToCompletedListAction } from "../actions/completeActions";
import { priorityTaskAction, moveToPriorityListAction } from "../actions/priorityActions";


export const ToDoList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.task.taskList);

  // initial values and functions for react state variables
  // task list
  // const [tasks, setTasks] = useState(taskList);

  // text of the input field in the dialog
  const [description, setDescription] = useState("");

  // selected item/s
  const [selection, setSelection] = useState([]);

  // dialog visibility
  const [visible, setVisible] = useState(false);

  // whether we're adding or editing from the dialog
  const [mode, setMode] = useState("ADD");

  /**
   * @description open the dialog
   */
  const openDialog = () => {
    setVisible(true);
  };

  /**
   * @description close the dialog
   */
  const closeDialog = () => {
    setVisible(false);
  };

  /**
   * @description handler function for adding tasks
   */

  // handleAdd opens the dialog in "ADD" mode, clearing the description.
  const handleAdd = () => {
    // set the description
    setDescription("");
    // set the mode
    setMode("ADD");
    // open the dialog
    openDialog();
  };

  /**
   * @description handler function for editing tasks
   */

  // handleEdit opens the dialog in "EDIT" mode and populates the description with the selected task's description.

  const handleEdit = () => {
    // set the description from the current selection
    const task = selection[0];
    setDescription(task.description);
    // set the mode
    setMode("EDIT");
    // open the dialog
    openDialog();
  };

  /**
   * @description function that sets the description state variable
   * @param {event} event - change event from input
   */

  // handleDescription updates the description state based on user input.
  const handleDescription = (event) => {
    setDescription(event.target.value);
  };



// My code starts from here

  /**
   * @description handler function to set the selection state variable
   * @param {array} ids - array of IDs passed in from Grid select event
   * INSTRUCTIONS: use the js filter method to set the selection as an array of tasks
   */

  const handleSelection = (ids) => {
    // your code here
    setSelection(ids.map((id) => tasks.find((task) => task.id === id)));
  };

  /**
   * @description function for submitting from the dialog
   * INSTRUCTIONS: use the mode to determine which function to call when
   * clicking the submit button
   */
  const handleSubmit = () => {
    // your code here
    if (mode === "ADD") {
      createTask();
    } else if (mode === "EDIT") {
      updateTask();
    }
    closeDialog();
  };

  // 	// CREATE TASK FUNCTION
  /**
   * @description function to create a task for the toDo list
   * INSTRUCTIONS: use the description state variable to create a new task object
   * and add it with the setTasks hook
   */
  const createTask = () => {
    // your code here
    const newTask = {
      id: nanoid(),
      description,
      complete: false,
			priority: false,
    };
    dispatch(addTask(newTask));
  };

  // UPDATE TASK FUNCTION
  /**
   * @description function to update an exsting task
   * INSTRUCTIONS: use the selection state variable and setTasks hook
   * with a js map to create a new task array
   */
  const updateTask = () => {
    // your code here
    dispatch(editTask(selection[0].id, description));
  };

  // REMOVE TASK
  /**
   * @description method to remove an existing task
   * INSTRUCTIONS: use the selection state variable and setTasks hook
   * with a js filter to create a new task array
   */
  const removeTask = () => {
    // your code here
    dispatch(removeTaskAction(selection[0].id));
  };

  // COMPLETE TASK FUNCTION
  /**
   * @description method to mark a task as complete
   * @param {*} id the id of the task to mark as complete
   * INSTRUCTIONS: use the setTasks hook with a js map to create a new task array
   */
  const completeTask = (id) => {
    // your code here
    // If the id matches, it creates a new task object using the spread operator ({ ...task}) to copy all existing properties of the task. It then updates the complete property with the negation (!) of the current value of the complete property. check the statement in reducer
    dispatch(completeTaskAction(id));

    dispatch(moveToCompletedListAction(id));
  };

  const priorityTask = (id) => {
    // your code here
    // If the id matches, it creates a new task object using the spread operator ({ ...task}) to copy all existing properties of the task. It then updates the complete property with the negation (!) of the current value of the complete property. check the statement in reducer
    dispatch(priorityTaskAction(id));

    dispatch(moveToPriorityListAction(id));
  };

  // the Data grid columns - the renderCell will replace a cell's text with a React component - in this case a checkbox
  const columns = [
    { field: "description", headerName: "Description", flex: 1 },
    {
      field: "complete",
      headerName: "Complete",
      flex: 0.3,
      renderCell: (params) => (
        <Checkbox
          checked={params.value}
          onChange={() => completeTask(params.id)}
        />
      ),
    },
    // another field for priority list
    {
      field: "priority",
      headerName: "Priority",
      flex: 0.3,
      renderCell: (params) => (
        <Checkbox
          checked={params.value}
          onChange={() => priorityTask(params.id)}
          disabled={params.row.complete}
        />
      ),
      headerClassName: "bold-header",
    },
  ];

  return (
    <div>
      <Typography
        variant="h4"
        align="center"
        fontFamily="'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif"
        gutterBottom
      >
        <h1>To Do List</h1>
        {/* Dialog for adding and editing */}
        <Dialog open={visible}>
          <div
            style={{ width: "300px", padding: "20px" }}
            className="d-flex flex-column"
          >
            <span style={{ fontWeight: 'bold' }}>{mode} Task - Enter task description</span>
            <br />
            <input value={description} onChange={handleDescription}></input>
          </div>
          <div className="d-flex justify-content-center">
            <Button variant="contained" color="primary" style={{ margin: "8px" }} onClick={handleSubmit}>Submit</Button>
            <Button  variant="contained" color="primary" style={{ margin: "8px" }} onClick={closeDialog}>Cancel</Button>
          </div>
        </Dialog>


        {/* Main to do list */}
        <Paper
          elevation={3}
          style={{
            padding: "20px",
            margin: "20px",
            maxWidth: "600px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <div className="d-flex flex-column align-items-center">
            {tasks.length === 0 ? (
              <p>Add Your Todo List</p>
            ) : (
              <div style={{ width: "100%" }}>
                <DataGrid
                  onRowSelectionModelChange={handleSelection}
                  rows={tasks}
                  columns={columns}
                  autoHeight
                />
              </div>
            )}

            <div className="d-flex justify-content-center">
              <Button
                variant="contained"
                color="primary"
                onClick={handleAdd}
                style={{ margin: "8px" }}
              >
                Add
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleEdit}
                // if there is no selection or no list available make the button disable
                disabled={!selection[0] || tasks.length === 0}
                style={{ margin: "8px" }}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={removeTask}
                disabled={!selection[0] || tasks.length === 0}
                style={{ margin: "8px" }}
              >
                Remove
              </Button>
            </div>
          </div>
        </Paper>
      </Typography>
    </div>
  );
};
