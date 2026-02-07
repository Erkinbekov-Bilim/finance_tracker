import Logo from '../../UI/Logo/Logo';
import NavigateComponent from '../../UI/Navigate/NavigateComponent';
import './Header.css';
import { type INavigate } from '../../UI/Navigate/navigate.types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLayerGroup, faPlus } from '@fortawesome/free-solid-svg-icons';
import Button from '../../UI/Button/Button';

const navigates: INavigate[] = [
  {
    title: 'Categories',
    to: '/categories',
    icon: <FontAwesomeIcon icon={faLayerGroup} />,
  },
];

const Header = () => {
  return (
    <>
      <header className="header">
        <div className="header-content">
          <Logo to="/" name="Finance Tracker" size="small" />
          <NavigateComponent navigates={navigates}>
            <Button className="navigate-button btn-add navigate-link">
              <p>add transaction</p>
              <div className="navigate-icon">
                <FontAwesomeIcon icon={faPlus} />
              </div>
            </Button>
          </NavigateComponent>
        </div>
      </header>
    </>
  );
};

export default Header;
