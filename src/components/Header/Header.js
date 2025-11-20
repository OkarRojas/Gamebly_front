import React, { useEffect, useState } from 'react';
import './Header.css';
import { useNavigate, useLocation } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import { buscarJuegos } from '../../services/apiClient';
import filtroo from '../filtro/filtro.js';

// Mapa estático de títulos por ruta.
const ROUTE_TITLES = {
  '/': 'Home',
  '/Gamebly_front': 'Home',
  '/about': 'My library',
  '/new-games': 'New Games',
  '/recommendations': 'Recommendations',
  '/genre-filter': 'Genre Search',
  '/store': 'Store',
  '/contact': 'Contact',
  '/juego': 'Game Details'
};

// Resuelve el título según la ruta actual (soporta rutas que comienzan con la clave como /juego/:id).
function resolveTitle(pathname) {
  if (ROUTE_TITLES[pathname]) return ROUTE_TITLES[pathname];
  for (const [base, title] of Object.entries(ROUTE_TITLES)) {
    if (pathname.startsWith(base)) return title;
  }
  return 'Gamebly';
}

function Header() {
  const [busqueda, setBusqueda] = useState('');
  const [resultados, setResultados] = useState([]);
  const [mostrarResultados, setMostrarResultados] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [pageTitle, setPageTitle] = useState('Gamebly');
  const navigate = useNavigate();
  const location = useLocation();

  // Actualizar título según la ruta.
  useEffect(() => {
    setPageTitle(resolveTitle(location.pathname));
  }, [location.pathname]);

  // Búsqueda en tiempo real (debounce 300ms).
  useEffect(() => {
    const timer = setTimeout(async () => {
      const query = busqueda.trim();
      if (!query) {
        setResultados([]);
        setMostrarResultados(false);
        return;
      }
      try {
        setCargando(true);
        const datos = await buscarJuegos(query);
        setResultados(datos);
        setMostrarResultados(true);
      } catch (error) {
        console.error('Error en búsqueda:', error);
        setResultados([]);
      } finally {
        setCargando(false);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [busqueda]);

  const handleSelectJuego = (juego) => {
    console.log('Juego seleccionado:', juego);
    setBusqueda('');
    setMostrarResultados(false);
    navigate(`/juego/${juego._id}`);
  };

  return (
    <header className="header">
      <div className="header-content">
        {/* Logo y título */}
        <div className="header-left">          
          <span className="page-title">{pageTitle}</span>
        </div>
        <div className='filtro'>
          {filtroo && React.createElement(filtroo)}
        </div>

        {/* Título dinámico según ruta */}
        <div className="header-center">
          <SearchBar 
            placeholder="Buscar juegos..." 
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="header-search"
          />
        {/* Barra de búsqueda */}
          {/* ✅ Mostrar dropdown con resultados */}
          {mostrarResultados && (
            <div className="search-resultados">
              {cargando && <p className="search-loading">Buscando...</p>}
              
              {!cargando && resultados.length === 0 && busqueda.trim() && (
                <p className="search-empty">No se encontraron juegos</p>
              )}
          {/* Dropdown de resultados */}
              {!cargando && resultados.length > 0 && (
                <ul className="search-lista">
                  {resultados.slice(0, 8).map(juego => ( // Máximo 8 resultados
                    <li 
                      key={juego._id}
                      className="search-item"
                      onClick={() => handleSelectJuego(juego)}
                    >
                      
                      <div className="search-item__info">
                        <img src={juego.imagen} alt={juego.nombre} className="search-item__imagen" />
                        <div className='letters-info'>
                          <p className="search-item__nombre">{juego.nombre}</p>
                          <p className="search-item__genero">{juego.genero}</p>
                        </div>                        
                        
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
        <div className="header-right">
          {/* Aquí va lo que tenías antes */}
        </div>
      </div>

      {/* Contenedor duplicado de resultados (se mantiene por compatibilidad visual) */}
      
    </header>
  );
}

export default Header;
