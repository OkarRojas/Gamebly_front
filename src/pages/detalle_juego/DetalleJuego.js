import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './DetalleJuego.css';

export const DetalleJuego = () => {
  const { id } = useParams();
  const [juego, setJuego] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarJuego = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/games/${id}`);
        if (!response.ok) throw new Error('Juego no encontrado');
        const datos = await response.json();
        setJuego(datos);
      } catch (err) {
        console.error('Error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    cargarJuego();
  }, [id]);

  if (loading) return <div style={{padding: '2rem'}}>Cargando...</div>;
  if (error) return <div style={{padding: '2rem', color: 'red'}}>Error: {error}</div>;
  if (!juego) return <div style={{padding: '2rem'}}>Juego no encontrado</div>;

  return (
    <div className="detalle-juego">
      <div className="detalle-container">
        <div className="detalle-imagen-container">
          <img 
            src={juego.imagen} 
            alt={juego.nombre}
            className="detalle-imagen"
          />
        </div>

        <div className="detalle-info">
          <h1 className="detalle-titulo">{juego.nombre}</h1>
          <p className="detalle-desarrolladora">{juego.desarrolladora}</p>
          <p className="detalle-descripcion">{juego.descripcion}</p>

          <div className="detalle-detalles">
            <div className="detalle-seccion">
              <h3>Información</h3>
              <div className="detalle-grid">
                <div className="detalle-item">
                  <span className="detalle-label">Género</span>
                  <span className="detalle-valor">{juego.genero}</span>
                </div>
                <div className="detalle-item">
                  <span className="detalle-label">Plataforma</span>
                  <span className="detalle-valor">{juego.plataforma}</span>
                </div>
                <div className="detalle-item">
                  <span className="detalle-label">Año</span>
                  <span className="detalle-valor">{juego.anioLanzamiento}</span>
                </div>
                <div className="detalle-item">
                  <span className="detalle-label">Rating</span>
                  <span className="detalle-valor">⭐ {juego.rating}/10</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetalleJuego;
