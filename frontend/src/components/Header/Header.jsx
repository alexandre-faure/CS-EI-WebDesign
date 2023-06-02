import { Link } from 'react-router-dom';
import './Header.css';
import logo_cinesuggest from './assets/logo_cinesuggest.svg';
import { doc } from 'prettier';

const Header = () => {
  return (
    <div className="Header-container">
      <Link className="Link header-logo-container" to="/">
        <img src={logo_cinesuggest} alt="alt" className="header-logo" />
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
      <div id="deconnexion-div"
      onClick={e => {
        let date = new Date(Date.now()).toUTCString;
        document.cookie = `user_id=; SameSite=lax; expires${date}; secure`;
        document.cookie = `session_active=; SameSite=lax; expires${date}; secure`;
        document.location.href = '/auth'       
      }}>
        Déconnexion
      </div>
    </div>
  );
};

export default Header;
