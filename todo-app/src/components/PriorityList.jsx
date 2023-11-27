import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Typography, List, ListItem, ListItemText, Paper } from "@mui/material";
import Button from "@mui/material/Button";
import { removeTaskAction } from "../actions/taskActions";


export const PriorityList = () => {

  const priorityList = useSelector((state) => state.task.priorityList);
  const dispatch = useDispatch()

  const removeTask = (id) => {
		// your code here
		dispatch(removeTaskAction(id));
	};


  return (
    <Paper
    elevation={3}
    style={{
      padding: "20px",
      margin: "20px",
      maxWidth: "400px",
      marginLeft: "auto",
      marginRight: "auto",
    }}
  >
    <Typography variant="h4" align="center" gutterBottom>
      Priority Tasks
    </Typography>
    <List style={{
      color: "red"
    }}>
      {priorityList.map((task) => (
        <ListItem key={task.id}>
          <ListItemText primary={task.description} />
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
  </Paper>
  );
};