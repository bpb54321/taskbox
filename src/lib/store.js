/* A simple redux store/actions/reducer implementation.
 * A true app would be more complex and separated into different files.
 */
import {
  configureStore,
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";

const TaskBoxData = {
  tasks: [],
  status: "idle",
  error: null,
};

export const fetchTasks = createAsyncThunk("todos/fetchTodos", async () => {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/todos?userId=1"
  );
  const data = await response.json();
  const result = data.map((task) => ({
    id: `${task.id}`,
    title: task.title,
    state: task.completed ? "TASK_ARCHIVED" : "TASK_INBOX",
  }));
  return result;
});

/*
 * The store is created here.
 * You can read more about Redux Toolkit's slices in the docs:
 * https://redux-toolkit.js.org/api/createSlice
 */
export const TasksSlice = createSlice({
  name: "taskbox",
  initialState: TaskBoxData,
  reducers: {
    updateTaskState: (state, action) => {
      const { id, newTaskState } = action.payload;
      const taskIndex = state.tasks.findIndex((task) => task.id === id);

      if (taskIndex >= 0) {
        const currentTask = state.tasks[taskIndex];
        currentTask.state = newTaskState;
        currentTask.isFocused = false;

        for (let index = taskIndex + 1; index < state.tasks.length; index++) {
          const nextTask = state.tasks[index];
          if (nextTask.state !== "TASK_ARCHIVED") {
            nextTask.isFocused = true;
            break;
          }
        }
      }
    },
  },
  /*
   * Extends the reducer for the async actions
   * You can read more about it at https://redux-toolkit.js.org/api/createAsyncThunk
   */
  extraReducers(builder) {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.tasks = [];
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.tasks = action.payload.map((task) => ({
          ...task,
          isFocused: false,
        }));
      })
      .addCase(fetchTasks.rejected, (state) => {
        state.status = "failed";
        state.error = "Something went wrong";
        state.tasks = [];
      });
  },
});

// The actions contained in the slice are exported for usage in our components
export const { updateTaskState } = TasksSlice.actions;

// Selectors
export const selectStatus = (state) => state.taskbox.status;

function getTasksWithPinnedFirst(tasks) {
  return [
    ...tasks.filter((t) => t.state === "TASK_PINNED"),
    ...tasks.filter((t) => t.state !== "TASK_PINNED"),
  ];
}

function getNonArchivedTasks(tasks) {
  return tasks.filter((task) => task.state !== "TASK_ARCHIVED");
}

const selectTasks = (state) => state.taskbox.tasks;

export const selectTransformedTasks = createSelector([selectTasks], (tasks) => {
  const nonArchivedTasks = getNonArchivedTasks(tasks);
  const tasksWithPinnedFirst = getTasksWithPinnedFirst(nonArchivedTasks);
  return tasksWithPinnedFirst;
});

export const taskboxSliceReducerMapPortion = {
  taskbox: TasksSlice.reducer,
};
/*
 * Our app's store configuration goes here.
 * Read more about Redux's configureStore in the docs:
 * https://redux-toolkit.js.org/api/configureStore
 */
const store = configureStore({
  reducer: {
    ...taskboxSliceReducerMapPortion,
  },
});

export default store;
