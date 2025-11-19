import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ← AGREGA ESTO
import { fetchBiblioteca } from '../services/apiClient';
import './about.css';

export const BibliotecaGris = () => {
  const [juegos, setJuegos] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // ← AGREGA ESTO

  useEffect(() => {
    const cargarBiblioteca = async () => {
      try {
        const data = await fetchBiblioteca();
        const soloBiblioteca = data.filter(juego => juego.enBiblioteca === true);
        setJuegos(soloBiblioteca);
      } catch (err) {
        setError('Error al cargar los juegos de biblioteca');
        setJuegos([]);
      } finally {
        setLoading(false);
      }
    };
    cargarBiblioteca();
  }, []);

  // Filtro en tiempo real
  const juegosFiltrados = juegos.filter(juego =>
    juego.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    juego.plataforma.toLowerCase().includes(busqueda.toLowerCase())
  );

  // ✅ FUNCIÓN PARA NAVEGAR AL DETALLE
  const handleClickJuego = (juegoId) => {
    console.log('Navegando a juego:', juegoId);
    navigate(`/juego/${juegoId}`);
  };

  if (loading) return <div style={{padding: '2rem'}}>Cargando biblioteca...</div>;
  if (error) return <div style={{padding: '2rem'}}>{error}</div>;
  if (juegos.length === 0) return <div style={{padding: '2rem'}}>No tienes juegos en tu biblioteca</div>;

  return (
    <section className="biblioteca-gris">
      <h2 className="biblioteca-gris__titulo">📚 Mi Biblioteca</h2>
      
      
      
      <div className="biblioteca-gris__scroll">
        {juegosFiltrados.length === 0 && !loading && !error && (
          <div style={{padding: '2rem'}}>No hay juegos que coincidan con tu búsqueda</div>
        )}
        <div className="biblioteca-gris__grid">
          {juegosFiltrados.map(juego => (
            // ✅ AGREGA onClick AQUÍ
            <div 
              key={juego._id} 
              className="biblioteca-gris__card"
              onClick={() => handleClickJuego(juego._id)}
              style={{ cursor: 'pointer' }}
            >
              <img 
                src={juego.imagen || 'https://via.placeholder.com/300x200?text=Sin+Imagen'} 
                alt={juego.nombre}
                className="biblioteca-gris__imagen"
              />
              <h3 className="biblioteca-gris__nombre">{juego.nombre}</h3>
              <p className="biblioteca-gris__plataforma">{juego.plataforma}</p>
              <p className="biblioteca-gris__anio">Año: {juego.anioLanzamiento}</p>
              <p className="biblioteca-gris__horas">Horas jugadas: {juego.horasJugadas}</p>
              <p className="biblioteca-gris__rating">⭐ {juego.rating}/10</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BibliotecaGris;
