import { useState } from "react";

function AddTaskModal({ onConfirm, onCancel }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [titleError, setTitleError] = useState("");

  const todayStr = new Date().toISOString().split("T")[0];

  const handleSubmit = () => {
    if (!title.trim()) {
      setTitleError("Task title is required.");
      return;
    }
    if (title.trim().length > 50) {
      setTitleError("Title must be 50 characters or less.");
      return;
    }
    setTitleError("");
    onConfirm({ title: title.trim(), description, dueDate });
  };

  const handleTitleChange = (e) => {
    const val = e.target.value;
    if (val.length > 50) {
      setTitleError("Title must be 50 characters or less.");
    } else if (val.trim()) {
      setTitleError("");
    }
    setTitle(val);
  };

  return (
    <div className="modal-overlay">
      <div className="modal modal-edit">
        <div className="modal-icon">➕</div>
        <h2 className="modal-title">New Task</h2>
        <div className="edit-fields">
          <div className="edit-field-group">
            <label className="edit-label">
              Title *{" "}
              <span
                className={`char-count ${
                  title.length >= 50
                    ? "at-limit"
                    : title.length >= 40
                    ? "near-limit"
                    : ""
                }`}
              >
                {title.length}/50
              </span>
            </label>
            <input
              className={`edit-input ${titleError ? "input-error" : ""}`}
              type="text"
              value={title}
              onChange={handleTitleChange}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              placeholder="Task title (required)"
              autoFocus
              maxLength={51}
            />
            {titleError && <span className="error-msg">⚠ {titleError}</span>}
          </div>
          <div className="edit-field-group">
            <label className="edit-label">Description</label>
            <input
              className="edit-input"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description (optional)"
            />
          </div>
          <div className="edit-field-group">
            <label className="edit-label">Due Date</label>
            <input
              className="edit-input"
              type="date"
              value={dueDate}
              min={todayStr}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
        </div>
        <div className="modal-actions">
          <button className="modal-btn-cancel" onClick={onCancel}>
            Cancel
          </button>
          <button className="modal-btn-save" onClick={handleSubmit}>
            Create Task
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddTaskModal;

