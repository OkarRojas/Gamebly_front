import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

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
          <nav>
            <Link to="/">Inicio</Link> |{" "}
            <Link to="/about">Acerca de</Link> |{" "}
            <Link to="/contact">Contacto</Link>
          </nav>
        </li>
      </ul>
    </header>
  );
}
export default Header;