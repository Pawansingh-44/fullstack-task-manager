import { useState } from "react";

function EditModal({ task, onConfirm, onCancel }) {
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description || "");
  const [editDueDate, setEditDueDate] = useState(task.dueDate || "");

  const todayStr = new Date().toISOString().split("T")[0];

  const handleSubmit = () => {
    if (!editTitle.trim()) return;
    onConfirm({
      title: editTitle.trim(),
      description: editDescription,
      dueDate: editDueDate,
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal modal-edit">
        <div className="modal-icon">✏️</div>
        <h2 className="modal-title">Edit Task</h2>
        <div className="edit-fields">
          <div className="edit-field-group">
            <label className="edit-label">Title</label>
            <input
              className="edit-input"
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              placeholder="Task title"
              autoFocus
            />
          </div>
          <div className="edit-field-group">
            <label className="edit-label">Description</label>
            <input
              className="edit-input"
              type="text"
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              placeholder="Description (optional)"
            />
          </div>
          <div className="edit-field-group">
            <label className="edit-label">Due Date</label>
            <input
              className="edit-input"
              type="date"
              value={editDueDate}
              min={todayStr}
              onChange={(e) => setEditDueDate(e.target.value)}
            />
          </div>
        </div>
        <div className="modal-actions">
          <button className="modal-btn-cancel" onClick={onCancel}>
            Cancel
          </button>
          <button className="modal-btn-save" onClick={handleSubmit}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditModal;

