import React from 'react';
import './Logo.css';
import { Link } from 'react-router-dom';

interface ILogoProps {
  to: string;
  size?: 'small' | 'medium' | 'large';
  name?: string;
}

const Logo: React.FC<ILogoProps> = ({ to, size = 'medium', name }) => {
  return (
    <>
      <div className="logo">
        <Link to={to} className={`logo-link`}>
          <img
            src="/finance_tracker_logo.jpeg"
            alt="Finance Tracker"
            className={`logo-img logo-${size}`}
          />
          <p className={`logo-name logo-name-${size}`}>{name}</p>
        </Link>
      </div>
    </>
  );
};

export default Logo;
