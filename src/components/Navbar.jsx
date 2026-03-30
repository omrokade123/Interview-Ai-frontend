import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../features/auth/hooks/useAuth';
import './style/Navbar.scss';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, handleLogout } = useAuth();
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate('/profile');
    setIsDropdownOpen(false);
  };

  const handleLogoutClick = () => {
    handleLogout();
    navigate('/login');
    setIsDropdownOpen(false);
  };

  const userInitial = user?.username?.[0]?.toUpperCase() || '';

  return (
    <nav className='nav'>
      <div className="nav-brand">
        <h1>TalentStage</h1>
      </div>
      <ul className="nav-menu">
        <li><NavLink to="/" className={({isActive}) => isActive ? 'active' : ''}>Home</NavLink></li>
        <li><NavLink to="/about" className={({isActive}) => isActive ? 'active' : ''}>About</NavLink></li>
        <li><NavLink to="/contact" className={({isActive}) => isActive ? 'active' : ''}>Contact</NavLink></li>
        
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