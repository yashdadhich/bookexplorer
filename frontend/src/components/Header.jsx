import React from "react";

const Header = () => (
  <header className="header">
    <div className="header-container">
      <h1 className="header-logo">📚 BookExplorer</h1>
      <nav className="header-nav">
        <a href="#" className="nav-link">
          Browse
        </a>
        <a href="#" className="nav-link">
          Categories
        </a>
        <a href="#" className="nav-link">
          About
        </a>
      </nav>
    </div>
  </header>
);

export default Header;
