import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './DetalleJuego.css';

export const DetalleJuego = () => {
  const { id } = useParams();
  const [juego, setJuego] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [screenshotActual, setScreenshotActual] = useState(0);

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

  // Renderizar estrellas según rating
  const renderStars = (rating) => {
    const stars = Math.round(rating / 2);
    return '⭐'.repeat(Math.min(stars, 5));
  };

  // Formatear duración
  const formatearDuracion = (horas) => {
    if (horas === 999) return '∞ Ilimitado';
    return `${horas}h`;
  };

  // Cambiar screenshot
  const cambiarScreenshot = (direccion) => {
    if (!juego.screenshots || juego.screenshots.length === 0) return;
    if (direccion === 'siguiente') {
      setScreenshotActual((prev) => (prev + 1) % juego.screenshots.length);
    } else {
      setScreenshotActual((prev) => (prev - 1 + juego.screenshots.length) % juego.screenshots.length);
    }
  };

  if (loading) return <div className="detalle-juego-loader">⏳ Cargando juego...</div>;
  if (error) return <div className="detalle-juego-error">❌ Error: {error}</div>;
  if (!juego) return <div className="detalle-juego-error">❌ Juego no encontrado</div>;

  return (
    <div className="detalle-juego">
      {/* HEADER CON IMAGEN Y TÍTULO */}
      <div className="detalle-header">
        <img
          src={juego.imagen || 'https://via.placeholder.com/1280x400?text=Sin+Imagen'}
          alt={juego.nombre}
          className="detalle-banner"
        />
        <div className="detalle-header-overlay">
          <h1 className="detalle-titulo-main">{juego.nombre}</h1>
          <div className="detalle-badges">
            <span className="badge badge-genero">🎮 {juego.genero}</span>
            <span className="badge badge-plataforma">🖥️ {juego.plataforma}</span>
            <span className="badge badge-año">📅 {juego.anioLanzamiento}</span>
            <span className="badge badge-rating">⭐ {juego.rating.toFixed(1)}/10</span>
          </div>
        </div>
      </div>

      {/* CONTENEDOR PRINCIPAL */}
      <div className="detalle-container">
        
        {/* COLUMNA IZQUIERDA - IMAGEN Y DATOS BÁSICOS */}
        <aside className="detalle-sidebar">
          <div className="detalle-poster">
            <img
              src={juego.imagen || 'https://via.placeholder.com/300x400?text=Sin+Imagen'}
              alt={juego.nombre}
              className="detalle-imagen"
            />
            <div className="detalle-rating-grande">
              <div className="rating-circle">
                <span className="rating-number">{juego.rating.toFixed(1)}</span>
              </div>
            </div>
          </div>

          {/* INFORMACIÓN RÁPIDA */}
          <div className="detalle-quick-info">
            <div className="info-item">
              <span className="info-icon">⏱️</span>
              <div>
                <span className="info-label">Duración</span>
                <span className="info-value">{formatearDuracion(juego.duracionPromedio)}</span>
              </div>
            </div>

            <div className="info-item">
              <span className="info-icon">🎯</span>
              <div>
                <span className="info-label">Dificultad</span>
                <span className="info-value">{juego.dificultad || 'N/A'}</span>
              </div>
            </div>

            <div className="info-item">
              <span className="info-icon">👥</span>
              <div>
                <span className="info-label">Multijugador</span>
                <span className="info-value">{juego.multijugador ? '✅ Sí' : '❌ No'}</span>
              </div>
            </div>

            <div className="info-item">
              <span className="info-icon">📡</span>
              <div>
                <span className="info-label">Modo Offline</span>
                <span className="info-value">{juego.offline ? '✅ Sí' : '❌ No'}</span>
              </div>
            </div>

            <div className="info-item">
              <span className="info-icon">💰</span>
              <div>
                <span className="info-label">Precio</span>
                <span className="info-value precio">${juego.precio.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </aside>

        {/* COLUMNA DERECHA - CONTENIDO PRINCIPAL */}
        <main className="detalle-content">
          
          {/* DESCRIPCIÓN */}
          <section className="detalle-seccion">
            <h2 className="seccion-titulo">📖 Descripción</h2>
            <p className="detalle-descripcion">{juego.descripcion}</p>
          </section>

          {/* INFORMACIÓN DEL DESARROLLADOR */}
          <section className="detalle-seccion">
            <h2 className="seccion-titulo">🏢 Desarrollador</h2>
            <div className="desarrollador-info">
              <div className="dev-item">
                <span className="dev-label">Desarrolladora</span>
                <span className="dev-value">{juego.desarrolladora}</span>
              </div>
              {juego.publicador && (
                <div className="dev-item">
                  <span className="dev-label">Publicador</span>
                  <span className="dev-value">{juego.publicador}</span>
                </div>
              )}
            </div>
          </section>

          {/* REQUISITOS PC */}
          {juego.requisitosMinimoPC && juego.requisitosMinimoPC !== 'N/A - PlayStation' && (
            <section className="detalle-seccion">
              <h2 className="seccion-titulo">🖥️ Requisitos Mínimos (PC)</h2>
              <div className="requisitos-box">
                <p>{juego.requisitosMinimoPC}</p>
              </div>
            </section>
          )}

          {/* TRAILER */}
          {juego.trailer && (
            <section className="detalle-seccion">
              <h2 className="seccion-titulo">🎬 Trailer</h2>
              <div className="trailer-container">
                <iframe
                  width="100%"
                  height="400"
                  src={juego.trailer}
                  title={`${juego.nombre} Trailer`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="trailer-iframe"
                ></iframe>
              </div>
            </section>
          )}

          {/* SCREENSHOTS */}
          {juego.screenshots && juego.screenshots.length > 0 && (
            <section className="detalle-seccion">
              <h2 className="seccion-titulo">📸 Galería</h2>
              <div className="screenshots-viewer">
                <div className="screenshot-main">
                  <img
                    src={juego.screenshots[screenshotActual]}
                    alt={`Screenshot ${screenshotActual + 1}`}
                    className="screenshot-image"
                  />
                </div>
                <div className="screenshot-controls">
                  <button
                    className="screenshot-btn"
                    onClick={() => cambiarScreenshot('anterior')}
                  >
                    ◀ Anterior
                  </button>
                  <span className="screenshot-counter">
                    {screenshotActual + 1} / {juego.screenshots.length}
                  </span>
                  <button
                    className="screenshot-btn"
                    onClick={() => cambiarScreenshot('siguiente')}
                  >
                    Siguiente ▶
                  </button>
                </div>
              </div>
            </section>
          )}

          {/* BOTÓN DE ACCIÓN */}
          <section className="detalle-acciones">
            <button className="btn-comprar">🛒 Añadir a Biblioteca</button>
            <button className="btn-compartir">📤 Compartir</button>
          </section>
        </main>
      </div>
    </div>
  );
};

export default DetalleJuego;