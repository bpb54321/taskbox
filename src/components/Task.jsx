import PropTypes, { instanceOf } from "prop-types";
import { useRef, useEffect } from "react";

const TASK_ARCHIVED = "TASK_ARCHIVED";

export default function Task({
  task: { id, title, state, isFocused },
  onArchiveTask,
  onPinTask,
}) {
  const checkboxRef = useRef(null);
  useEffect(() => {
    if (isFocused && checkboxRef.current instanceof HTMLElement) {
      checkboxRef.current.focus();
    }
  }, [isFocused]);
  return (
    <div className={`list-item ${state}`}>
      <div className="checkbox">
        <label htmlFor={`task-checkbox-${id}`}>Archive Task</label>
        <input
          type="checkbox"
          name="task-checkbox"
          id={`task-checkbox-${id}`}
          checked={state === TASK_ARCHIVED}
          onChange={() => {
            console.log("Real checkbox input changed");
            onArchiveTask(id);
          }}
          ref={checkboxRef}
        />
        <span
          className="checkbox-custom"
          onClick={() => {
            console.log("Custom checkbox clicked");
            onArchiveTask(id);
          }}
        ></span>
      </div>
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
          readOnly
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
    isFocused: PropTypes.bool.isRequired,
  }),
  /** Event to change the task to archived */
  onArchiveTask: PropTypes.func,
  /** Event to change the task to pinned */
  onPinTask: PropTypes.func,
  isFocused: PropTypes.bool,
};
