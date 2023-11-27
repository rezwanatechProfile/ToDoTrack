// to handle completing a task and moving it to the completed list.

// Dispatching this action would typically update the state to reflect that the task with the specified id is now complete.
export const completeTaskAction = (id) => ({
  type: "COMPLETE_TASK",
  payload: id,
});

export const moveToCompletedListAction = (id) => ({
  type: "MOVE_TO_COMPLETED_LIST",
  payload: id,
});