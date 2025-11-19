// src/components/LibraryGrid.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './library-grid.css';

export default function LibraryGrid({ limit = 4 }) {
  const [games, setGames] = useState([]);
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
        console.log('📊 Datos brutos recibidos:', data); // DEBUG
        
        // Ajusta según tu estructura real
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
        
        console.log('✅ Juegos procesados:', lista.length); // DEBUG
        setGames(lista);
        setLoading(false);
      })
      .catch(err => {
        console.error('❌ Error:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleSeeMore = () => {
    navigate('/store');
  };

  if (loading) return <div className="library-loading">Cargando juegos...</div>;
  if (error) return <div className="library-error">Error: {error}</div>;
  if (games.length === 0) return <div className="library-empty">No hay juegos disponibles</div>;

  const displayGames = limit ? games.slice(0, limit) : games;

  return (
    <div className="library-grid-container">
      <div className="library-grid-header" >
        <h2>Store</h2>
        {limit && games.length > limit && (
          <button className="see-more-btn" onClick={handleSeeMore}>Ver más</button>
        )}
      </div>
      <div className="library-grid">
        {displayGames.map((game) => (
          <div 
            className="library-card" 
            key={game._id}
            onClick={() => navigate(`/juego/${game._id}`)}
            style={{ cursor: 'pointer' }}
          >
            <img 
              src={game.imagen || 'https://via.placeholder.com/240x140?text=Game'} 
              alt={game.nombre} 
              className="library-card-image"
            />
            <h3>{game.nombre}</h3>
            <p>{game.genero} - {game.plataforma}</p>
            <span className="library-card-rating">⭐ {game.rating}/10</span>
          </div>
        ))}
      </div>
    </div>
  );
}
