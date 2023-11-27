

// addTask, creates and returns an action object.
// This object has a type property set to the string "ADD_TASK", indicating that this action is for adding a task.
// The payload property contains the data associated with the action, in this case, the task that is being added.
export const addTask = (task) => ({
  type: "ADD_TASK",
  payload: task,
});



// This action typically indicates that the task with the specified id should be edited with the new description.
export const editTask = (id, description) => ({
  type: "EDIT_TASK",
  payload: { id, description },
});


// payload property contains the id of the task to be removed.
// Dispatching this action would trigger the removal of the task with the specified id from the state.
export const removeTaskAction = (id) => ({
  type: "REMOVE_TASK",
  payload: id,
});


