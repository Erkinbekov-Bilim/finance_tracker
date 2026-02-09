import Logo from '../../UI/Logo/Logo';
import NavigateComponent from '../../UI/Navigate/NavigateComponent';
import './Header.css';
import { type INavigate } from '../../UI/Navigate/navigate.types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLayerGroup, faPlus } from '@fortawesome/free-solid-svg-icons';

const navigates: INavigate[] = [
  {
    title: 'Categories',
    to: '/categories',
    icon: <FontAwesomeIcon icon={faLayerGroup} />,
  },
  {
    title: 'Add Transaction',
    to: '/transactions/add',
    icon: <FontAwesomeIcon icon={faPlus} />,
  }
];

const Header = () => {
  return (
    <>
      <header className="header">
        <div className="header-content">
          <Logo to="/" name="Finance Tracker" size="small" />
          <NavigateComponent navigates={navigates}/>
        </div>
      </header>
    </>
  );
};

export default Header;
