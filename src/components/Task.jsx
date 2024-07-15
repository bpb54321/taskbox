import PropTypes from "prop-types";

const TASK_ARCHIVED = "TASK_ARCHIVED";

export default function Task({
  task: { id, title, state },
  onArchiveTask,
  onPinTask,
}) {
  return (
    <div className={`list-item ${state}`}>
      <label
        htmlFor={`task-checkbox-${id}`}
        aria-label={"Task archived"}
        className="checkbox"
      >
        <input
          type="checkbox"
          name="task-checkbox"
          id={`task-checkbox-${id}`}
          checked={state === TASK_ARCHIVED}
        />
        <span
          className="checkbox-custom"
          onClick={() => onArchiveTask(id)}
        ></span>
      </label>
      <label
        htmlFor={`task-title-${id}`}
        aria-label="Task title"
        className="title"
      >
        <input
          type="text"
          value={title}
          name="title"
          id={`task-title-${id}`}
          placeholder="The title of your task"
        />
      </label>
      {state !== TASK_ARCHIVED && (
        <button
          className="pin-button"
          onClick={() => onPinTask(id)}
          id={`pin-task-button-${id}`}
          aria-label="Pin task"
        >
          <span className="icon-star"></span>
        </button>
      )}
    </div>
  );
}

Task.propTypes = {
  /** Composition of the task */
  task: PropTypes.shape({
    /** Id of the task */
    id: PropTypes.string.isRequired,
    /** Title of the task */
    title: PropTypes.string.isRequired,
    /** Current state of the task */
    state: PropTypes.string.isRequired,
  }),
  /** Event to change the task to archived */
  onArchiveTask: PropTypes.func,
  /** Event to change the task to pinned */
  onPinTask: PropTypes.func,
};
