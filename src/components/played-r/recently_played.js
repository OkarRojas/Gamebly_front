import React, { useRef, useEffect } from 'react';
import './recently_played.css'; // Tu CSS aquí

export default function CarruselLibros() {
  const carruselRef = useRef(null);

  useEffect(() => {
    const carrusel = carruselRef.current;
    const ruedaHandler = (evento) => {
      evento.preventDefault();
      carrusel.scrollLeft += evento.deltaY;
    };
    if (carrusel) {
      carrusel.addEventListener('wheel', ruedaHandler);
    }
    return () => {
      if (carrusel) {
        carrusel.removeEventListener('wheel', ruedaHandler);
      }
    };
  }, []);

  return (
    <section className="seccion-carrusel">
      <h3>Books you read last</h3>
      <div className="contenedor-tarjetas" ref={carruselRef}>
        {/* Más tarjetas */}
        <div className="tarjeta-libro">
          <img src="libro1.jpg" alt="Libro 1"/>
          <h4>Harry Potter</h4>
          <p>189 Pages • Chapter 13</p>
        </div>
         <div className="tarjeta-libro">
          <img src="libro1.jpg" alt="Libro 1"/>
          <h4>Harry Potter</h4>
          <p>189 Pages • Chapter 13</p>
        </div>
         <div className="tarjeta-libro">
          <img src="libro1.jpg" alt="Libro 1"/>
          <h4>Harry Potter</h4>
          <p>189 Pages • Chapter 13</p>
        </div>
         <div className="tarjeta-libro">
          <img src="libro1.jpg" alt="Libro 1"/>
          <h4>Harry Potter</h4>
          <p>189 Pages • Chapter 13</p>
        </div>
         <div className="tarjeta-libro">
          <img src="libro1.jpg" alt="Libro 1"/>
          <h4>Harry Potter</h4>
          <p>189 Pages • Chapter 13</p>
        </div>
        {/* ... etc ... */}
      </div>
    </section>
  );
}
