import { Link } from 'react-router-dom';
import './Header.css';
import logo_netflix from './assets/logo_netflix.svg';

const Header = () => {
  return (
    <div className="Header-container">
      <Link className="Link header-logo-container" to="/">
        <img src={logo_netflix} alt="alt" className="header-logo" />
      </Link>
      <Link className="Link" to="/">
        Home
      </Link>
      <Link className="Link" to="/profil">
        Profil
      </Link>
      <Link className="Link" to="/mlistes">
        Mes listes
      </Link>
      <Link className="Link" to="/about">
        About
      </Link>
    </div>
  );
};

export default Header;
