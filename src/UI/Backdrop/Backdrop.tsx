import type React from 'react';
import './Backdrop.css';

interface IBackdropProps {
  onClose: () => void;
}

const Backdrop: React.FC<IBackdropProps> = ({onClose}) => {
  return <div className="backdrop" onClick={onClose}></div>;
};

export default Backdrop;