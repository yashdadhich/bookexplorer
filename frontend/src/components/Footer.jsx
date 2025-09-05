import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand */}
        <h3 className="footer-title">📚 BookExplorer</h3>

        {/* Tagline */}
        <p className="footer-tagline">
          Discover, explore, and fall in love with books.
        </p>

        {/* Links */}
        <div className="footer-links">
          <a href="#" className="footer-link">Privacy</a>
          <a href="#" className="footer-link">Terms</a>
          <a href="#" className="footer-link">Contact</a>
        </div>

        {/* Divider + Copyright */}
        <div className="footer-bottom">
          <p className="footer-copy">
            © {new Date().getFullYear()} BookExplorer. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
