import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './filtro.css';

export default function filtro() {
  const [games, setGames] = useState([]);
  const [genres, setGenres] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [filteredGames, setFilteredGames] = useState([]);
  const navigate = useNavigate();

  // ✅ CARGAR JUEGOS Y GÉNEROS
  useEffect(() => {
    fetch('http://localhost:3000/api/games')
      .then(res => res.json())
      .then(data => {
        let lista = [];
        if (Array.isArray(data)) {
          lista = data;
        } else if (data.juegos && Array.isArray(data.juegos)) {
          lista = data.juegos;
        } else if (data.games && Array.isArray(data.games)) {
          lista = data.games;
        } else if (data.data && Array.isArray(data.data)) {
          lista = data.data;
        }
        
        setGames(lista);
        
        // Extraer géneros únicos
        const uniqueGenres = [...new Set(lista.map(game => game.genero))].sort();
        setGenres(uniqueGenres);
      })
      .catch(err => console.error('Error:', err));
  }, []);

  // ✅ FILTRAR JUEGOS CUANDO SELECCIONA GÉNERO
  const handleGenreClick = (genre) => {
    setSelectedGenre(genre);
    const filtered = games.filter(game => game.genero === genre);
    setFilteredGames(filtered);
  };

  // ✅ LIMPIAR FILTRO
  const handleClearFilter = () => {
    setSelectedGenre(null);
    setFilteredGames([]);
    setIsOpen(false);
  };

  // Cerrar menú al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.search-bar-container')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="search-bar-container">
      {/* Botón principal */}
      <button 
        className="search-bar-btn"
        onClick={() => setIsOpen(!isOpen)}
      >
        🔍 Buscar por Género
        <span className={`dropdown-arrow ${isOpen ? 'open' : ''}`}>▼</span>
      </button>

      {/* Menú desplegable */}
      {isOpen && (
        <div className="search-bar-dropdown">
          <div className="dropdown-header">
            <h3>Selecciona un género</h3>
            <button 
              className="close-btn"
              onClick={() => setIsOpen(false)}
            >
              ✕
            </button>
          </div>

          <div className="genres-list">
            {genres.map((genre) => (
              <button
                key={genre}
                className="genre-btn"
                onClick={() => handleGenreClick(genre)}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Mostrar juegos filtrados (si hay un género seleccionado) */}
      {selectedGenre && filteredGames.length > 0 && (
        <div className="search-results">
          <div className="results-header">
            <h4>Juegos de {selectedGenre}</h4>
            <button 
              className="clear-results-btn"
              onClick={handleClearFilter}
            >
              ✕ Limpiar
            </button>
          </div>

          <div className="results-grid">
            {filteredGames.map((game) => (
              <div 
                key={game._id}
                className="result-card"
                onClick={() => navigate(`/juego/${game._id}`)}
              >
                <img 
                  src={game.imagen || 'https://via.placeholder.com/120x100?text=Game'} 
                  alt={game.nombre}
                  className="result-card-image"
                />
                <div className="result-card-info">
                  <h5>{game.nombre}</h5>
                  <p>{game.plataforma}</p>
                  <span className="result-rating">⭐ {game.rating}/10</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedGenre && filteredGames.length === 0 && (
        <div className="search-empty">
          <p>No hay juegos en este género</p>
        </div>
      )}
    </div>
  );
}
