import store from "../lib/store";
import InboxScreen from "./InboxScreen";

import { http, HttpResponse } from "msw";

import { Provider } from "react-redux";
import { defaultTaskboxState } from "./TaskList.stories";

import {
  expect,
  fireEvent,
  waitFor,
  waitForElementToBeRemoved,
  within,
} from "@storybook/test";

export default {
  component: InboxScreen,
  title: "InboxScreen",
  decorators: [(story) => <Provider store={store}>{story()}</Provider>],
  tags: ["autodocs"],
};

const todoEndpoint = "https://jsonplaceholder.typicode.com/todos";

export const Default = {
  parameters: {
    msw: {
      handlers: [
        http.get(todoEndpoint, () => {
          return HttpResponse.json(defaultTaskboxState.tasks);
        }),
      ],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const allTasks = await canvas.findAllByTestId("task");

    const firstTask = allTasks[0];
    expect(within(firstTask).getByTestId("task-title")).toHaveValue("Task 1");

    const thirdTask = allTasks[2];
    expect(within(thirdTask).getByTestId("task-title")).toHaveValue("Task 3");

    await fireEvent.click(within(firstTask).getByTestId("pin-task-button"));
    await fireEvent.click(within(thirdTask).getByTestId("pin-task-button"));

    const allTasksAgain = canvas.getAllByTestId("task");

    const newFirstTask = allTasksAgain[0];
    expect(within(newFirstTask).getByTestId("task-title")).toHaveValue(
      "Task 1"
    );

    const newSecondTask = allTasksAgain[1];
    expect(within(newSecondTask).getByTestId("task-title")).toHaveValue(
      "Task 3"
    );
  },
};

export const Error = {
  parameters: {
    msw: {
      handlers: [
        http.get(todoEndpoint, () => {
          return new HttpResponse(null, {
            status: 403,
          });
        }),
      ],
    },
  },
};
