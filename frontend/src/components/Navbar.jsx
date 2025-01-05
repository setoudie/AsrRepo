import React, { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false); // Popup state

  // Dynamically load the LinkedIn Badge script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://platform.linkedin.com/badges/js/profile.js";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      // Clean up the script when the component unmounts
      document.body.removeChild(script);
    };
  }, []);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen); // Toggle popup visibility
  };

  return (
    <nav className="navbar">
      <div className="logo" onClick={togglePopup}>
        Sétoudié
      </div>
      <ul className="navLinks">
        <li>
          <a href="https://www.linkedin.com/in/seny-toutou-diedhiou" target="_blank" rel="noopener noreferrer" className="link">
            LinkedIn
          </a>
        </li>
        <li>
          <a href="https://slender-turtle-f82.notion.site/ASRApp-14c862a4b981808fa0abccbb4a622d0f?pvs=4" target="_blank" className="link">
            Tools
          </a>
        </li>
        <li>
          <a href="https://github.com/setoudie/AsrRepo/blob/main/README.md" target="_blank" className="link">
            ReadMe
          </a>
        </li>
      </ul>

      {/* Popup Modal */}
      {isPopupOpen && (
        <div className="popup">
          <div className="popupContent">
            <span className="closeButton" onClick={togglePopup}>&times;</span>
            {/* LinkedIn Badge HTML */}
            <div className="badge-base LI-profile-badge" data-locale="fr_FR" data-size="medium" data-theme="light" data-type="VERTICAL" data-vanity="seny-toutou-diedhiou" data-version="v1">
              <a className="badge-base__link LI-simple-link" href="https://sn.linkedin.com/in/seny-toutou-diedhiou?trk=profile-badge">Sény Toutou Diedhiou 🇸🇳</a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
