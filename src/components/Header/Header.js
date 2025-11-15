import React from 'react';
import './Header.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function Home() {
  return <h2>Inicio</h2>;
}
function About() {
  return <a href="src\components\about_us\about.js" target="_blank" rel="noopener noreferrer">
  Abrir en nueva pestaña
</a>
}

function Contact() {
  return <h2>Contacto</h2>;
}

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
          <BrowserRouter>
            <nav>
              <Link to="/">Inicio</Link> |{" "}
              <Link to="/about">Acerca de</Link> |{" "}
              <Link to="/contact">Contacto</Link>
            </nav>

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </BrowserRouter>
        </li>
      </ul>
    </header>
  );
}
export default Header;