import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <ul className='menu-home'>
        <li>
          <h3>Gamebly</h3>
        </li>
        <li>
          <ul className='menu-home-ul'>
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </li>
      </ul>
    </header>
  );
}
export default Header;