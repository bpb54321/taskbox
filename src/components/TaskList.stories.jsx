import TaskList from "./TaskList";

import * as TaskStories from "./Task.stories";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { taskboxSliceReducerMapPortion } from "../lib/store";

const defaultTasks = [
  { ...TaskStories.Default.args.task, id: "1", title: "Task 1" },
  { ...TaskStories.Default.args.task, id: "2", title: "Task 2" },
  { ...TaskStories.Default.args.task, id: "3", title: "Task 3" },
  { ...TaskStories.Default.args.task, id: "4", title: "Task 4" },
  { ...TaskStories.Default.args.task, id: "5", title: "Task 5" },
  { ...TaskStories.Default.args.task, id: "6", title: "Task 6" },
];
export const defaultTaskboxState = {
  tasks: defaultTasks,
  status: "idle",
  error: null,
};

function configureTaskboxStoreWithPreloadedState(preloadedState) {
  return configureStore({
    reducer: {
      ...taskboxSliceReducerMapPortion,
    },
    preloadedState: {
      taskbox: preloadedState,
    },
  });
}

export default {
  component: TaskList,
  title: "TaskList",
  decorators: [(story) => <div style={{ margin: "3rem" }}>{story()}</div>],
  tags: ["autodocs"],
  excludeStories: /.*MockedState$/,
};

export const Default = {
  decorators: [
    (story) => {
      const store =
        configureTaskboxStoreWithPreloadedState(defaultTaskboxState);
      return <Provider store={store}>{story()}</Provider>;
    },
  ],
};

export const WithPinnedTasks = {
  decorators: [
    (story) => {
      const pinnedTasks = [
        ...defaultTaskboxState.tasks.slice(0, 5),
        { id: "6", title: "Task 6 (pinned)", state: "TASK_PINNED" },
      ];
      const store = configureTaskboxStoreWithPreloadedState({
        ...defaultTaskboxState,
        tasks: pinnedTasks,
      });
      return <Provider store={store}>{story()}</Provider>;
    },
  ],
};

export const Loading = {
  decorators: [
    (story) => {
      const store = configureTaskboxStoreWithPreloadedState({
        ...defaultTaskboxState,
        status: "loading",
      });
      return <Provider store={store}>{story()}</Provider>;
    },
  ],
};

export const Empty = {
  decorators: [
    (story) => {
      const store = configureTaskboxStoreWithPreloadedState({
        ...defaultTaskboxState,
        tasks: [],
      });
      return <Provider store={store}>{story()}</Provider>;
    },
  ],
};
