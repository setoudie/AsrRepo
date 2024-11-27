import React from 'react';

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>
        Setoudie
      </div>
      <ul style={styles.navLinks}>
        <li>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" style={styles.link}>
            LinkedIn
          </a>
        </li>
        <li>
          <a href="#tools" style={styles.link}>
            Tools
          </a>
        </li>
        <li>
          <a href="#readme" style={styles.link}>
            ReadMe
          </a>
        </li>
      </ul>
    </nav>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#333',
    color: '#fff',
  },
  logo: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#fff',
  },
  navLinks: {
    listStyle: 'none',
    display: 'flex',
    gap: '15px',
    margin: 0,
    padding: 0,
  },
  link: {
    textDecoration: 'none',
    color: '#fff',
    fontSize: '16px',
    fontWeight: '500',
    transition: 'color 0.3s',
  },
};

styles.link[':hover'] = {
  color: '#1e90ff', // Change la couleur lors du survol
};

export default Navbar;
