function TaskList({ tasks, filter, onToggle, onEdit, onDelete }) {
  const filtered = tasks
    .filter((t) =>
      filter === "completed" ? t.completed :
      filter === "active"    ? !t.completed : true
    )
    .sort((a, b) => b.id - a.id);

  const isOverdue = (t) =>
    !t.completed && t.dueDate && new Date(t.dueDate) < new Date();

  if (filtered.length === 0) {
    return (
      <div className="empty-state">
        <p className="empty-icon">📭</p>
        <h3>No tasks found</h3>
        <p>Click "+ New Task" to add one!</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {filtered.map((task) => (
        <div
          key={task.id}
          className={`task-row ${task.completed ? "task-done" : ""} ${
            isOverdue(task) ? "task-overdue" : ""
          }`}
        >
          <div className="task-row-left">
            <button
              className={`task-check ${task.completed ? "task-check-done" : ""}`}
              onClick={() => onToggle(task.id)}
              title="Toggle status"
            >
              {task.completed ? "✓" : ""}
            </button>
            <div className="task-info">
              <p className="task-title">{task.title}</p>
              {task.description && (
                <p className="task-desc">{task.description}</p>
              )}
            </div>
          </div>

          <div className="task-row-right">
            {task.dueDate && (
              <span className={`task-due-chip ${isOverdue(task) ? "due-overdue" : ""}`}>
                📅 {task.dueDate}
                {isOverdue(task) && " ⚠"}
              </span>
            )}
            {task.completed ? (
              <span className="chip chip-green">Completed</span>
            ) : isOverdue(task) ? (
              <span className="chip chip-red">Overdue</span>
            ) : (
              <span className="chip chip-amber">Active</span>
            )}
            <button className="icon-btn edit-ico" onClick={() => onEdit(task)} title="Edit">✏️</button>
            <button className="icon-btn del-ico"  onClick={() => onDelete(task)} title="Delete">🗑️</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TaskList;

