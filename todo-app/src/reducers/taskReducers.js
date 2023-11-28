// Initial state for the task reducer
const initialState = {
  taskList: [
    { id: 1, description: "Take Beaker for a walk", complete: false, priority: false },
    { id: 2, description: "Brush Beaker's coat", complete: false, priority: false },
    { id: 3, description: "Tell Beaker he is a good boy", complete: false, priority: false },
  ],
  completeList: [],
  priorityList: [],
};


// Reducer function for tasks
// two parameters: state (current state) and action (the dispatched action).

const taskReducer = (state = initialState, action) => {


  // Switch statement to handle different action type
  switch (action.type) {
    case "ADD_TASK":
      return {
        ...state,
        taskList: [...state.taskList, action.payload],
      };

    // Edits the description of a task with a specific id.
    case "EDIT_TASK":
      return {
        ...state,
        taskList: state.taskList.map((task) =>
          task.id === action.payload.id
            ? { ...task, description: action.payload.description }
            : task
        ),
      };

    // Removes a task with a specific id from the taskList
    case "REMOVE_TASK":
      return {
        ...state,
        taskList: state.taskList.filter((task) => task.id !== action.payload),

        // To remove complete Task
        completeList: state.completeList.filter(
          (completeTask) => completeTask.id !== action.payload
        ),

        // To remove cpriority Task
        priorityList: state.priorityList.filter(
          (priorityTask) => priorityTask.id !== action.payload
        ),
      };

    // Toggles the complete property of a task with a specific id.

    // Each task is checked, and if its id matches the action.payload (the task to be marked as complete), the complete property is toggled using !task.complete. If the id doesn't match, the task is left unchanged.
    case "COMPLETE_TASK":
      // Toggle the complete property in the task list
      return {
        ...state,
        taskList: state.taskList.map((task) =>
          task.id === action.payload
            ? { ...task, complete: !task.complete }
            : task
        ),

        priorityList: state.priorityList.map((task) =>
          task.id === action.payload
            ? { ...task, complete: !task.complete }
            : task
        ),
      };

    // MOVE_TASK_TO_COMPLETE
    // Move the task to the completed list
    case "MOVE_TO_COMPLETED_LIST":
      // Move the task to the completed list only if it's complete
      const taskToMove = state.taskList.find(
        (task) => task.id === action.payload
      );

      const priorityTaskToMove = state.priorityList.find(
        (task) => task.id === action.payload
      );
      //  Checks if the task is found and if it's marked as complete.
      if (taskToMove && taskToMove.complete) {
        return {
          ...state,
          // taskList: It filters out the task to be moved using state.taskList.filter.
          taskList: state.taskList.filter((task) => task.id !== action.payload),

          // completeList: It adds the found task to the completeList array.
          completeList: [...state.completeList, taskToMove],
        };
      }

      if (priorityTaskToMove && priorityTaskToMove.complete) {
        return {
          ...state,
          // taskList: It filters out the task to be moved using state.taskList.filter.
          priorityList: state.priorityList.filter((task) => task.id !== action.payload),

          // completeList: It adds the found task to the completeList array.
          completeList: [...state.completeList, priorityTaskToMove],
        };
      }

    // If the task is not found or is not marked as complete, it returns the current state (return state;). This is important to maintain the current state if the move operation is not valid.

    // PRIPRITY TASK REDUCERS
    case "PRIORITY_TASK":
      // Toggle the priority property in the task list
      return {
        ...state,
        taskList: state.taskList.map((task) =>
          task.id === action.payload
            ? { ...task, priority: !task.priority }
            : task
        ),
      };

    case "MOVE_TO_PRIORITY_LIST":
      // Move the task to the priority list only if it's priority
      const priorityToMove = state.taskList.find(
        (task) => task.id === action.payload
      );
      //  Checks if the task is found and if it's marked as priority.
      if (priorityToMove && priorityToMove.priority) {
        return {
          ...state,
          // taskList: It filters out the task to be moved using state.taskList.filter.
          taskList: state.taskList.filter((task) => task.id !== action.payload),

          // PriorityList: It adds the found task to the priorityList array.
          priorityList: [...state.priorityList, priorityToMove],
        };
      }

    case "EDIT_PRIORITY_TASK":
      return {
        ...state,
        priorityList: state.priorityList.map((task) =>
          task.id === action.payload.id
            ? { ...task, description: action.payload.description }
            : task
        ),
      };

    default:
      return state;
  }
};

export default taskReducer;