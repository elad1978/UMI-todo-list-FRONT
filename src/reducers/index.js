// // reducers/index.js
// import { createSlice } from "@reduxjs/toolkit";

// const TASK_STORAGE_KEY = "tasks";

// const loadTasksFromLocalStorage = () => {
//   const storedTasks = localStorage.getItem(TASK_STORAGE_KEY);
//   return storedTasks ? JSON.parse(storedTasks) : [];
// };

// const saveTasksToLocalStorage = (tasks) => {
//   localStorage.setItem(TASK_STORAGE_KEY, JSON.stringify(tasks));
// };

// const tasksSlice = createSlice({
//   name: "tasks",
//   initialState: {
//     tasks: loadTasksFromLocalStorage(),
//     sortBool: true,
//   },
//   reducers: {
//     addTask: (state, action) => {
//       state.tasks.push(action.payload);
//       saveTasksToLocalStorage(state.tasks);
//     },
//     updateTask: (state, action) => {
//       const index = state.tasks.findIndex(
//         (task) => task.id === action.payload.id
//       );
//       if (index !== -1) {
//         state.tasks[index] = action.payload;
//         saveTasksToLocalStorage(state.tasks);
//       }
//     },
//     deleteTask: (state, action) => {
//       state.tasks = state.tasks.filter((task) => task.id !== action.payload);
//       saveTasksToLocalStorage(state.tasks);
//     },
//     sortByUrgency: (state, action) => {
//       const { sortBool } = state;
//       const sortOrder = sortBool ? 1 : -1;
//       state.tasks = [...state.tasks].sort(
//         (a, b) => sortOrder * (a.urgency - b.urgency)
//       );
//       state.sortBool = !state.sortBool;
//       saveTasksToLocalStorage(state.tasks);
//     },
//     sortByDate: (state, action) => {
//       const { sortBool } = state;
//       const sortOrder = sortBool ? 1 : -1;
//       state.tasks = [...state.tasks].sort(
//         (a, b) => sortOrder * (new Date(a.date) - new Date(b.date))
//       );
//       state.sortBool = !state.sortBool;
//       saveTasksToLocalStorage(state.tasks);
//     },
//     sortByCheckboxStatus: (state, action) => {
//       const { sortBool } = state;
//       const sortOrder = sortBool ? 1 : -1;
//       state.tasks = [...state.tasks].sort(
//         (a, b) =>
//           sortOrder * ((a.isCheckedTask ? -1 : 1) - (b.isCheckedTask ? -1 : 1))
//       );
//       state.sortBool = !state.sortBool;
//       saveTasksToLocalStorage(state.tasks);
//     },
//   },
// });

// export const {
//   addTask,
//   updateTask,
//   deleteTask,
//   toggleSort,
//   setSortType,
//   sortByUrgency,
//   sortByDate,
//   sortByCheckboxStatus,
// } = tasksSlice.actions;

// export default tasksSlice.reducer;

// reducers/index.js
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = "http://localhost:3000"; // Replace with your API base URL

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    sortBool: true,
  },
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    updateTask: (state, action) => {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    sortByUrgency: (state, action) => {
      const { sortBool } = state;
      const sortOrder = sortBool ? 1 : -1;
      state.tasks = [...state.tasks].sort(
        (a, b) => sortOrder * (a.urgency - b.urgency)
      );
      state.sortBool = !state.sortBool;
    },
    sortByDate: (state, action) => {
      const { sortBool } = state;
      const sortOrder = sortBool ? 1 : -1;
      state.tasks = [...state.tasks].sort(
        (a, b) => sortOrder * (new Date(a.date) - new Date(b.date))
      );
      state.sortBool = !state.sortBool;
    },
    sortByCheckboxStatus: (state, action) => {
      const { sortBool } = state;
      const sortOrder = sortBool ? 1 : -1;
      state.tasks = [...state.tasks].sort(
        (a, b) =>
          sortOrder * ((a.isCheckedTask ? -1 : 1) - (b.isCheckedTask ? -1 : 1))
      );
      state.sortBool = !state.sortBool;
    },
    loadTasksSuccess: (state, action) => {
      state.tasks = action.payload;
    },
    loadTasksError: (state) => {
      // Handle error if needed
    },
    addTaskSuccess: (state, action) => {
      state.tasks.push(action.payload);
      state.error = null;
      // loadTasksFromServer();
    },
    addTaskError: (state, action) => {
      state.error = action.payload;
    },
    updateTaskSuccess: (state, action) => {
      console.log(action.payload);
      const index = state.tasks.findIndex(
        (task) => task._id === action.payload._id
      );
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
      state.error = null;
    },
    updateTaskError: (state, action) => {
      state.error = action.payload;
    },
    deleteTaskSuccess: (state, action) => {
      state.tasks = state.tasks.filter((task) => task._id !== action.payload);
      state.error = null;
    },
    deleteTaskError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  addTask,
  updateTask,
  deleteTask,
  sortByUrgency,
  sortByDate,
  sortByCheckboxStatus,
  loadTasksSuccess,
  loadTasksError,
  addTaskSuccess,
  addTaskError,
  updateTaskSuccess,
  updateTaskError,
  deleteTaskSuccess,
  deleteTaskError,
} = tasksSlice.actions;

export const loadTasksFromServer = () => async (dispatch) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/tasks`);
    const tasks = response.data;
    dispatch(loadTasksSuccess(tasks));
  } catch (error) {
    console.error("Error loading tasks from the server:", error);
    dispatch(loadTasksError());
  }
};

export const addTaskToServer = (newTask) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/tasks`, newTask);
    const addedTask = response.data;
    dispatch(addTaskSuccess(addedTask));
  } catch (error) {
    console.error("Error adding task to the server:", error);
    dispatch(addTaskError(error.message));
  }
};

export const updateTaskOnServer = (updatedTask) => async (dispatch) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/tasks/${updatedTask._id}`,
      updatedTask
    );
    const modifiedTask = response.data;
    console.log(modifiedTask);
    dispatch(updateTaskSuccess(modifiedTask));
  } catch (error) {
    console.error("Error updating task on the server:", error);
    dispatch(updateTaskError(error.message));
  }
};

export const deleteTaskFromServer = (taskId) => async (dispatch) => {
  try {
    await axios.delete(`${API_BASE_URL}/tasks/${taskId}`);
    dispatch(deleteTaskSuccess(taskId));
  } catch (error) {
    console.error("Error deleting task from the server:", error);
    dispatch(deleteTaskError(error.message));
  }
};

export default tasksSlice.reducer;
