import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = ({ isAuthenticated, handleLogout }) => {
  const handleLinkClick = (path) => {
    window.location.pathname = path;
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">FIT-BOT</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            {isAuthenticated ? (
              <>
                <li className="nav-item" onClick={() => handleLinkClick('/home')}>
                  <span className="nav-link">Home</span>
                </li>
                <li className="nav-item" onClick={() => handleLinkClick('/tracker')}>
                  <span className="nav-link">Tracker</span>
                </li>
                <li className="nav-item" onClick={() => handleLinkClick('/chatbot')}>
                  <span className="nav-link">Chatbot</span>
                </li>
                <li className="nav-item" onClick={() => handleLinkClick('/community')}>
                  <span className="nav-link">Community</span>
                </li>
                <li className="nav-item" onClick={() => handleLinkClick('/contact')}>
                  <span className="nav-link">Contact</span>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item" onClick={() => handleLinkClick('/login')}>
                  <span className="nav-link">Login</span>
                </li>
                <li className="nav-item" onClick={() => handleLinkClick('/signup')}>
                  <span className="nav-link">Sign Up</span>
                </li>
                <li className="nav-item" onClick={() => handleLinkClick('/contact')}>
                  <span className="nav-link">Contact</span>
                </li>
              </>
            )}
          </ul>
          {isAuthenticated && (
            <Link className="nav-link logout-btn" to="login" onClick={handleLogout}>Logout</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
