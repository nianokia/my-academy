import Modal from "./Modal";

const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Are you sure you want to proceed?",
  message = "This action is permanent and can't be undone.",
  confirmText = "Confirm",
  cancelText = "Cancel",
  cancelColor = "#d9534f"
}) => {
  if (!isOpen) return null;

  const handleConfirm = async () => {
    await onConfirm();
    // --- close modal after confirmation ---
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h3>{title}</h3>
      <p>{message}</p>
      <div className="modal-actions">
        <button onClick={handleConfirm} className="confirmBtn">
          {confirmText}
        </button>
        <button onClick={onClose} className="cancelBtn" style={{ backgroundColor: cancelColor}}>
          {cancelText}
        </button>
      </div>
    </Modal>
  )
}

export default ConfirmModal;