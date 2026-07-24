import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LoginContext } from '../../context/LoginContext';
import './Navbar.css';

function Navbar() {
  const { user, logout } = useContext(LoginContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const userName = user?.firstName || user?.email?.split('@')[0];

  const handleLogout = () => { logout(); navigate('/userlogin'); };

  return <header className="public-navbar"><div className="public-nav-content"><Link to="/" className="public-brand"><i className="bi bi-people-fill" />Job<span>Track</span></Link>
  <button className="public-menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu"><i className={`bi bi-${menuOpen ? 'x-lg' : 'list'}`} /></button>
  <nav className={menuOpen ? 'public-nav-links open' : 'public-nav-links'}>
    <Link to="/">Home</Link>
    <a href="#jobs">Jobs</a>
    <a href="#features">Companies</a>
    <a href="#how-it-works">About Us</a>
    <a href="#features">Pricing</a>
    <a href="#footer">Contact</a>
    {user ? <><span className="nav-user">Hi, {userName}</span>
    <button className="nav-logout" onClick={handleLogout}>Logout</button>
    </> : <>
    <Link className="nav-login" to="/userlogin">Login</Link>
    <Link className="nav-register" to="/userregister">Register</Link></>}
    </nav>
    </div>
    </header>;
}

export default Navbar;
