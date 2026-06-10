import { useEffect } from "react";
import "./Modal.css";

function Modal({ isOpen, onClose, title, children, theme }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div
        className={`modal-content ${theme ? `modal-letter modal-letter--${theme}` : "glass-card"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <button className="modal-close" onClick={onClose} aria-label="Close">
            ✕
          </button>
          {title && (
            <h3 id="modal-title" className="modal-title">
              {title}
            </h3>
          )}
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
