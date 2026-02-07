import './Modal.css';
import type { PropsWithChildren } from 'react';
import type React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

interface IModal extends PropsWithChildren {
  onClose: () => void;
}

const Modal: React.FC<IModal> = ({ onClose, children }) => {
  return (
    <>
      <div className="modal">
        <div className="modal-close-button" onClick={onClose}>
          <FontAwesomeIcon icon={faXmark} />
        </div>
        <div className="modal-content">{children}</div>
      </div>
    </>
  );
};

export default Modal;
