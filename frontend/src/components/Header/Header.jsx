import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <div className="Header-container">
      <Link className="Link" to="/">
        Home
      </Link>
      <div>|</div>
      <Link className="Link" to="/counter">
        Counter
      </Link>
      <div>|</div>
      <Link className="Link" to="/profil">
        Profil
      </Link>
      <div>|</div>
      <Link className="Link" to="/mlistes">
        Mes listes
      </Link>
      <div>|</div>
      <Link className="Link" to="/about">
        About
      </Link>
    </div>
  );
};

export default Header;
