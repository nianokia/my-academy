const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    // --- Close modal when clicking outside modal ---
    <div className="modal-overlay" onClick={onClose}>
      {/* --- Prevent closing when clicking inside modal --- */}
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;