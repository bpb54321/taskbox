import Task from "./Task";

export default function TaskList({ loading, tasks, onPinTask, onArchiveTask }) {
  const taskEventHandlers = {
    onPinTask,
    onArchiveTask,
  };

  const LoadingRow = () => (
    <div className="loading-item">
      <span className="glow-checkbox"></span>
      <span className="glow-text">
        <span>Loading</span> <span>cool</span> <span>state</span>
      </span>
    </div>
  );

  if (loading) {
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

  const tasksWithPinnedFirst = [
    ...tasks.filter((t) => t.state === "TASK_PINNED"),
    ...tasks.filter((t) => t.state !== "TASK_PINNED"),
  ];

  return (
    <div className="list-items">
      {tasksWithPinnedFirst.map((task) => (
        <Task key={task.id} task={task} {...taskEventHandlers} />
      ))}
    </div>
  );
}
