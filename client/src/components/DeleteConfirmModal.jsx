const DeleteConfirmModal = ({
    onCancel,
    onConfirm,
  }) => {
  
    return (
      <div className="modal-overlay">
  
        <div className="glass-card delete-modal">
  
          <h2 className="delete-modal-title">
            Delete Event?
          </h2>
  
  
          <p className="delete-modal-text">
  
            This action cannot be
            undone. The event and
            all related data will
            be permanently removed.
  
          </p>
  
  
          <div className="delete-modal-actions">
  
            <button
              className="secondary-btn"
              onClick={onCancel}
            >
              Cancel
            </button>
  
  
            <button
              className="danger-btn"
              onClick={onConfirm}
            >
              Delete Event
            </button>
  
          </div>
  
        </div>
  
      </div>
    );
  };
  
  export default DeleteConfirmModal;