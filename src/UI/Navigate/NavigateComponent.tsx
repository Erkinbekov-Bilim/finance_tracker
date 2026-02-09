import { type FC } from 'react';
import type { INavigateProps } from './navigate.types';
import { NavLink } from 'react-router-dom';
import './NavigateComponent.css';

const NavigateComponent: FC<INavigateProps> = ({ navigates }) => {
  return (
    <nav className="nav">
      <ul className="nav-list">
        {navigates.map((navigate) => (
          <li className="navigate-item" key={navigate.title}>
            <NavLink to={navigate.to} className="navigate-link">
              <p className="navigate-title">{navigate.title}</p>
              {navigate.icon && (
                <div className="navigate-icon">{navigate.icon}</div>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavigateComponent;
