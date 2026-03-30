import React from 'react'
import { NavLink } from 'react-router-dom';
import './style/Navbar.scss';

const Navbar = () => {
  return (
    <nav className='nav'>
      <div className="nav-brand">
        <h1>TalentStage</h1>
      </div>
      <ul className="nav-menu">
        <li><NavLink to="/" className={({isActive}) => isActive ? 'active' : ''}>Home</NavLink></li>
        <li><NavLink to="/about" className={({isActive}) => isActive ? 'active' : ''}>About</NavLink></li>
        <li><NavLink to="/contact" className={({isActive}) => isActive ? 'active' : ''}>Contact</NavLink></li>
      </ul>
    </nav>
  )
}

export default Navbar