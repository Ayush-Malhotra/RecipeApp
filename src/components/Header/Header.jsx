import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from './logoreci.svg';
const Header = ({ isLoggedIn, handleLogout }) => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-logo-title">
          <img src={logo} alt="Pantry Chef Logo" className="header-logo"/>
          <h1 className="header-title">Pantry Chef</h1>
        </div>
        <nav className="header-nav">
          <Link to="/" className="header-link">Home</Link>
          {/* <Link to="/smart-recipe" className="header-link">Smart Recipe</Link>
          {isLoggedIn ? (
            <button className="header-button" onClick={handleLogout}>Logout</button>
          ) : (
            <Link to="/login" className="header-link">Login</Link>
          )} */}
        </nav>
      </div>
    </header>
  );
};

export default Header;