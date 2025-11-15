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
          <form action="/buscar" method="GET" className="barra-busqueda-sencilla">
            <input type="text" 
                  name="q" 
                  placeholder="Buscar..." 
                  aria-label="Campo de búsqueda" />
            <button type="submit">🔍</button>
        </form>
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