import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './store.css';

export default function Store() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [gamesPerPage] = useState(6); // 6 juegos por página
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3000/api/games')
      .then(res => {
        if (!res.ok) throw new Error('Error en la respuesta');
        return res.json();
      })
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
        setLoading(false);
      })
      .catch(err => {
        console.error('❌ Error:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Lógica de paginación
  const totalPages = Math.ceil(games.length / gamesPerPage);
  const startIndex = (currentPage - 1) * gamesPerPage;
  const endIndex = startIndex + gamesPerPage;
  const currentGames = games.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo(0, 0);
    }
  };

  if (loading) return <div className="store-loading">Cargando tienda...</div>;
  if (error) return <div className="store-error">Error: {error}</div>;
  if (games.length === 0) return <div className="store-empty">No hay juegos disponibles</div>;

  return (
    <div className="store-container">
      <h2 className="store-title">🎮 Store - Todos los Juegos</h2>

      <div className="store-grid">
        {currentGames.map((game) => (
          <div 
            className="store-card" 
            key={game._id}
            onClick={() => navigate(`/juego/${game._id}`)}
            style={{ cursor: 'pointer' }}
          >
            <img 
              src={game.imagen || 'https://via.placeholder.com/240x140?text=Game'} 
              alt={game.nombre} 
              className="store-card-image"
            />
            <h3>{game.nombre}</h3>
            <p>{game.genero} - {game.plataforma}</p>
            <span className="store-card-rating">⭐ {game.rating}/10</span>
          </div>
        ))}
      </div>

      {/* Controles de paginación */}
      {totalPages > 1 && (
        <div className="store-pagination">
          <button 
            className="pagination-btn"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            ← Anterior
          </button>
          
          <span className="pagination-info">
            Página {currentPage} de {totalPages}
          </span>
          
          <button 
            className="pagination-btn"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Siguiente →
          </button>
        </div>
      )}
    </div>
  );
}
