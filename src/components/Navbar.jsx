import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../features/auth/hooks/useAuth';
import './style/Navbar.scss';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, handleLogout } = useAuth();
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate('/profile');
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  const handleLogoutClick = () => {
    handleLogout();
    navigate('/login');
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  const userInitial = user?.username?.[0]?.toUpperCase() || '';

  return (
    <nav className='nav'>
      <div className="nav-brand">
        <h1>InterviewAI</h1>
      </div>
      
      <button 
        className={`hamburger ${isMobileMenuOpen ? 'hamburger--active' : ''}`}
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle menu"
      >
        <span className="hamburger__line"></span>
        <span className="hamburger__line"></span>
        <span className="hamburger__line"></span>
      </button>

      <ul className={`nav-menu ${isMobileMenuOpen ? 'nav-menu--active' : ''}`}>
        <li><NavLink to="/" className={({isActive}) => isActive ? 'active' : ''} onClick={handleNavClick}>Home</NavLink></li>
        <li><NavLink to="/about" className={({isActive}) => isActive ? 'active' : ''} onClick={handleNavClick}>About</NavLink></li>
        <li><NavLink to="/contact" className={({isActive}) => isActive ? 'active' : ''} onClick={handleNavClick}>Contact</NavLink></li>
        
        {user && (
          <li className="nav-user">
            <button 
              className="user-avatar" 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              title={user.username}
            >
              {userInitial}
            </button>
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <button onClick={handleProfileClick} className="dropdown-item">
                  Profile
                </button>
                <button onClick={handleLogoutClick} className="dropdown-item logout">
                  Logout
                </button>
              </div>
            )}
          </li>
        )}
      </ul>
    </nav>
  )
}

export default Navbar