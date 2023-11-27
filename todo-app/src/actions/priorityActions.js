// to handle prioritize a task and moving it to the priority list.

// Dispatching this action would typically update the state to reflect that the task with the specified id is now priority.
export const priorityTaskAction = (id) => ({
  type: "PRIORITY_TASK",
  payload: id,
});

export const moveToPriorityListAction = (id) => ({
  type: "MOVE_TO_PRIORITY_LIST",
  payload: id,
});


// This action typically indicates that the task with the specified id should be edited with the new description.
export const editPriorityTaskActions = (id, description) => ({
  type: "EDIT_PRIORITY_TASK",
  payload: { id, description },
});