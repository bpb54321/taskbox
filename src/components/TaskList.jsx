import PropTypes from "prop-types";
import Task from "./Task";
import { useSelector, useDispatch } from "react-redux";
import { updateTaskState } from "../lib/store";

function getTasksWithPinnedFirst(tasks) {
  return [
    ...tasks.filter((t) => t.state === "TASK_PINNED"),
    ...tasks.filter((t) => t.state !== "TASK_PINNED"),
  ];
}

function getNonArchivedTasks(tasks) {
  return tasks.filter((task) => task.state !== "TASK_ARCHIVED");
}

function selectTasks(state) {
  const tasks = state.taskbox.tasks;
  // debugger;
  const nonArchivedTasks = getNonArchivedTasks(tasks);
  const tasksWithPinnedFirst = getTasksWithPinnedFirst(nonArchivedTasks);
  return tasksWithPinnedFirst;
}

function selectStatus(state) {
  return state.taskbox.status;
}

function selectFocusedTaskIndex(state) {
  return state.taskbox.focusedTaskIndex;
}

export default function TaskList() {
  const dispatch = useDispatch();
  const tasks = useSelector(selectTasks);
  const status = useSelector(selectStatus);
  const focusedTaskIndex = useSelector(selectFocusedTaskIndex);

  const pinTask = (id) => {
    dispatch(updateTaskState({ id, newTaskState: "TASK_PINNED" }));
  };
  const archiveTask = (id) => {
    dispatch(updateTaskState({ id, newTaskState: "TASK_ARCHIVED" }));
  };

  const LoadingRow = () => (
    <div className="loading-item">
      <span className="glow-checkbox"></span>
      <span className="glow-text">
        <span>Loading</span> <span>cool</span> <span>state</span>
      </span>
    </div>
  );

  if (status === "loading") {
    return (
      <div className="list-items" data-testid="loading">
        <LoadingRow key={"loading-row-0"} />
        <LoadingRow key={"loading-row-1"} />
        <LoadingRow key={"loading-row-2"} />
        <LoadingRow key={"loading-row-3"} />
        <LoadingRow key={"loading-row-4"} />
        <LoadingRow key={"loading-row-5"} />
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="list-items" data-testid="empty">
        <div className="wrapper-message">
          <span className="icon-check"></span>
          <p className="title-message">You have no tasks</p>
          <p className="subtitle-message">Sit back and relax</p>
        </div>
      </div>
    );
  }

  return (
    <div className="list-items">
      {getTasksWithPinnedFirst(tasks).map((task, taskIndex) => (
        <Task
          key={task.id}
          task={task}
          onArchiveTask={() => archiveTask(task.id)}
          onPinTask={() => pinTask(task.id)}
          isFocused={taskIndex === focusedTaskIndex}
        />
      ))}
    </div>
  );
}

TaskList.propTypes = {
  loading: PropTypes.bool,
  tasks: PropTypes.arrayOf(Task.propTypes.task).isRequired,
  onPinTask: PropTypes.func,
  onArchiveTask: PropTypes.func,
};

TaskList.defaultProps = {
  loading: false,
};
