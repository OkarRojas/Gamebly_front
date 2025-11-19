import React, { useState, useEffect } from 'react';
import './Header.css';
import { Link, useNavigate } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import { buscarJuegos } from '../../services/apiClient';
import filtroo from '../filtro/filtro';

function Header() {
  const [busqueda, setBusqueda] = useState('');
  const [resultados, setResultados] = useState([]);
  const [mostrarResultados, setMostrarResultados] = useState(false);
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();

  // ✅ Buscar en tiempo real mientras escribes
  useEffect(() => {
    const buscar = async () => {
      if (busqueda.trim() === '') {
        setResultados([]);
        setMostrarResultados(false);
        return;
      }

      try {
        setCargando(true);
        // Llamar a la API para buscar
        const datos = await buscarJuegos(busqueda);
        setResultados(datos);
        setMostrarResultados(true);
      } catch (error) {
        console.error('Error en búsqueda:', error);
        setResultados([]);
      } finally {
        setCargando(false);
      }
    };

    // ✅ Esperar 300ms después de que el usuario deja de escribir (debounce)
    const timer = setTimeout(buscar, 300);
    return () => clearTimeout(timer);
  }, [busqueda]);

  // Manejar click en un resultado
  const handleSelectJuego = (juego) => {
    // Puedes navegar a una página de detalle del juego si lo deseas
    console.log('Juego seleccionado:', juego);
    setBusqueda('');
    setMostrarResultados(false);
    // navigate(`/juego/${juego._id}`); // Si tienes esta ruta
  };

  return (
    <header className="header">
      <ul className='menu-home'>
        <li>
          <filtroo />
        </li>
        <li className="header-search-container">
          <SearchBar 
            placeholder="Buscar juegos..." 
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="header-search"
          />
          
          {/* ✅ Mostrar dropdown con resultados */}
          {mostrarResultados && (
            <div className="search-resultados">
              {cargando && <p className="search-loading">Buscando...</p>}
              
              {!cargando && resultados.length === 0 && busqueda.trim() && (
                <p className="search-empty">No se encontraron juegos</p>
              )}
              
              {!cargando && resultados.length > 0 && (
                <ul className="search-lista">
                  {resultados.slice(0, 8).map(juego => ( // Máximo 8 resultados
                    <li 
                      key={juego._id}
                      className="search-item"
                      onClick={() => handleSelectJuego(juego)}
                    >
                      
                      <div className="search-item__info">
                        <p className="search-item__nombre">{juego.nombre}</p>
                        <p className="search-item__genero">{juego.genero}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </li>
        
      </ul>
    </header>
  );
}

export default Header;
