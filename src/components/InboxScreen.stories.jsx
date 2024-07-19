import InboxScreen from "./InboxScreen";
import store from "../lib/store";

import { http, HttpResponse } from "msw";

import { Provider } from "react-redux";
import { defaultTaskboxState } from "./TaskList.stories";

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
