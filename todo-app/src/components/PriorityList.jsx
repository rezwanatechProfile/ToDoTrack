import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Typography, List, ListItem, ListItemText, Paper, Dialog, Grid, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { removeTaskAction } from "../actions/taskActions";
import { editPriorityTaskActions } from "../actions/priorityActions";


export const PriorityList = () => {

  const priorityList = useSelector((state) => state.task.priorityList);
  const dispatch = useDispatch()



// ADD visible, description, selectedTask, openDialog and closeDialog for EDIT button
  const [visible, setVisible] = useState(false);
  const [description, setDescription] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);


  const openDialog = (task) => {
    setDescription(task.description);
    setSelectedTask(task);
    setVisible(true);
  };

  const closeDialog = () => {
    setVisible(false);
    setSelectedTask(null);
  };


  const handleEditPriority = (id) => {
    const task = priorityList.find((task) => task.id === id);
    openDialog(task);
  };

  const handleDescription = (event) => {
    setDescription(event.target.value);
  };


  const handleSubmit = () => {
    if (selectedTask) {
      dispatch(editPriorityTaskActions(selectedTask.id, description));
      closeDialog();
    }
  };



  return (
    <Paper elevation={3} style={{ padding: '20px', margin: '20px', marginRight: '50px' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Priority Tasks
      </Typography>

      <List style={{ color: 'red' }}>
        {priorityList.map((task) => (
          <ListItem key={task.id}>
            <ListItemText primary={task.description} />

            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleEditPriority(task.id)}
              style={{ marginRight: '5px', marginLeft: '8px' }}
            >
              EDIT
            </Button>

            <Button
              variant="contained"
              color="error"
              onClick={() => dispatch(removeTaskAction(task.id))}
            >
              DELETE
            </Button>
          </ListItem>
        ))}
      </List>

      {/* Dialog for editing priority tasks */}
      <Dialog open={visible}>
        <div style={{ padding: '20px' }}>
          <Typography variant="h6" align="center" gutterBottom>
            EDIT Priority Task
          </Typography>
          <br />
          <TextField
            label="Enter task description"
            variant="outlined"
            fullWidth
            value={description}
            onChange={handleDescription}
          />
        </div>
        <Grid container justifyContent="center">
          <Button variant="contained" color="primary" onClick={handleSubmit} style={{ margin: '8px' }}>
            Submit
          </Button>
          <Button variant="contained" color="primary" onClick={closeDialog} style={{ margin: '8px' }}>
            Cancel
          </Button>
        </Grid>
      </Dialog>
    </Paper>
  );
};