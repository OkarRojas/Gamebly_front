import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './recommendations.css';

export default function Recommendations() {
  const [games, setGames] = useState([]);
  const [recommendedGames, setRecommendedGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
        // ✅ OBTÉN JUEGOS ALEATORIOS
        const random = getRandomGames(lista, 6); // 6 juegos random
        setRecommendedGames(random);
        setLoading(false);
      })
      .catch(err => {
        console.error('❌ Error:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // ✅ FUNCIÓN PARA OBTENER JUEGOS ALEATORIOS
  const getRandomGames = (array, count) => {
    const shuffled = [...array].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  };

  // ✅ BOTÓN PARA ACTUALIZAR RECOMENDACIONES
  const handleRefreshRecommendations = () => {
    const random = getRandomGames(games, 6);
    setRecommendedGames(random);
    window.scrollTo(0, 0);
  };

  if (loading) return <div className="recommendations-loading">Cargando recomendaciones...</div>;
  if (error) return <div className="recommendations-error">Error: {error}</div>;
  if (games.length === 0) return <div className="recommendations-empty">No hay juegos disponibles</div>;

  return (
    <div className="recommendations-container">
      <div className="recommendations-header">
        <h2 className="recommendations-title">✨ Recomendaciones para ti</h2>
        <button 
          className="refresh-btn"
          onClick={handleRefreshRecommendations}
        >
          🔄 Nuevas Recomendaciones
        </button>
      </div>

      <div className="recommendations-grid">
        {recommendedGames.map((game) => (
          <div 
            className="recommendations-card" 
            key={game._id}
            onClick={() => navigate(`/juego/${game._id}`)}
            style={{ cursor: 'pointer' }}
          >
            <div className="recommendations-card-image-container">
              <img 
                src={game.imagen || 'https://via.placeholder.com/240x140?text=Game'} 
                alt={game.nombre} 
                className="recommendations-card-image"
              />
            </div>
            <div className="recommendations-card-content">
              <h3>{game.nombre}</h3>
              <p className="recommendations-card-genre">{game.genero}</p>
              <p className="recommendations-card-platform">{game.plataforma}</p>
              <span className="recommendations-card-rating">⭐ {game.rating}/10</span>
              {game.precio && (
                <span className="recommendations-card-price">${game.precio}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
