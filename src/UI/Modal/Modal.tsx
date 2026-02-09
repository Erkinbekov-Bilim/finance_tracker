import './Modal.css';
import type { PropsWithChildren, ReactElement } from 'react';
import type React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

interface IModal extends PropsWithChildren {
  onClose?: () => void;
  to?: string;
}

const Modal: React.FC<IModal> = ({ onClose, to, children }) => {
  const renderContent = (icon: ReactElement) => {
    if (to)
      return (
        <Link className="modal-close-button" to={to}>
          {icon}
        </Link>
      );

    return (
      <div className="modal-close-button" onClick={onClose}>
        {icon}
      </div>
    );
  };

  return (
    <>
      <div className="modal">
        {renderContent(<FontAwesomeIcon icon={faXmark} />)}
        <div className="modal-content">{children}</div>
      </div>
    </>
  );
};

export default Modal;
