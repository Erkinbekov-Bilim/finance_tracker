import type React from 'react';
import './Backdrop.css';
import { Link } from 'react-router-dom';
import type { ReactElement } from 'react';

interface IBackdropProps {
  onClose?: () => void;
  to?: string;
}

const Backdrop: React.FC<IBackdropProps> = ({ onClose, to = null }) => {
  const content: ReactElement = <div className="backdrop" onClick={onClose}></div>;

  return to ? (
    <Link className="backdrop" onClick={onClose} to={to}></Link>
  ) : (
    content
  );
};

export default Backdrop;
