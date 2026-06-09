function DeleteModal({ taskTitle, onConfirm, onCancel }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-icon">🗑️</div>
        <h2 className="modal-title">Delete Task?</h2>
        <p className="modal-desc">
          Are you sure you want to delete <strong>"{taskTitle}"</strong>? This
          action cannot be undone.
        </p>
        <div className="modal-actions">
          <button className="modal-btn-cancel" onClick={onCancel}>
            Cancel
          </button>
          <button className="modal-btn-delete" onClick={onConfirm}>
            Delete Task
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;

