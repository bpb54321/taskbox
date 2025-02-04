import { useDispatch, useSelector } from "react-redux";
import {
  selectStatus,
  selectTransformedTasks,
  updateTaskState,
} from "../lib/store";
import Task from "./Task";

export default function TaskList() {
  const dispatch = useDispatch();
  const tasks = useSelector(selectTransformedTasks);
  const status = useSelector(selectStatus);

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
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          onArchiveTask={() => archiveTask(task.id)}
          onPinTask={() => pinTask(task.id)}
          isFocused={task.isFocused}
        />
      ))}
    </div>
  );
}
