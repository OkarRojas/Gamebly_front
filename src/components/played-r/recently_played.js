import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"; // ← AGREGA ESTO
import "./recently_played.css";

export default function RecentlyPlayed() {
  const contenedorRef = useRef(null);
  const pointerOverRef = useRef(false);
  const navigate = useNavigate(); // ← AGREGA ESTO

  useEffect(() => {
    const contenedor = contenedorRef.current;
    if (!contenedor) return;

    const scaleDelta = (e) => {
      if (e.deltaMode === 1) return e.deltaY * 16;
      if (e.deltaMode === 2) return e.deltaY * window.innerHeight;
      return e.deltaY;
    };

    const handleWheel = (event) => {
      if (!pointerOverRef.current) return;

      const delta = scaleDelta(event);

      if (Math.abs(event.deltaX) <= Math.abs(event.deltaY)) {
        contenedor.scrollLeft += delta;
        event.preventDefault();
        event.stopPropagation();
      }
    };

    const onPointerEnter = () => (pointerOverRef.current = true);
    const onPointerLeave = () => (pointerOverRef.current = false);

    contenedor.addEventListener("pointerenter", onPointerEnter);
    contenedor.addEventListener("pointerleave", onPointerLeave);
    contenedor.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      contenedor.removeEventListener("wheel", handleWheel);
      contenedor.removeEventListener("pointerenter", onPointerEnter);
      contenedor.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  const [recentGames, setRecentGames] = React.useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/games/recientes/ultimos")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setRecentGames(data.slice(0, 5));
        } else {
          setRecentGames([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching games:", err);
        setRecentGames([]);
      });
  }, []);

  // ✅ FUNCIÓN PARA NAVEGAR AL DETALLE
  const handleClickGame = (gameId) => {
    console.log('Navegando a juego:', gameId);
    navigate(`/juego/${gameId}`);
  };

  return (
    <div className="recently-played">
      <section className="seccion-carrusel">
        <div className="header-r">
          <h3>Games you played last</h3>
          <a href="#" onClick={(e) => {
            e.preventDefault();
            navigate("/about"); // O a donde quieras ir
          }}>
            see more
          </a>
        </div>

        <div ref={contenedorRef} className="contenedor-tarjetas">
          {Array.from({ length: 5 }).map((_, i) => {
            const game = recentGames[i];
            return (
              // ✅ AGREGA onClick Y cursor: pointer
              <div 
                className="tarjeta-libro" 
                key={i}
                onClick={() => {
                  if (game && game._id) {
                    handleClickGame(game._id);
                  }
                }}
                style={{ 
                  cursor: game && game._id ? 'pointer' : 'default',
                  transition: 'transform 0.2s'
                }}
              >
                {game && game.imagen ? (
                  <img
                    src={game.imagen}
                    alt={game.nombre || `Juego ${i + 1}`}
                    className="tarjeta-imagen"
                  />
                ) : (
                  <div
                    className="tarjeta-imagen placeholder"
                    style={{
                      width: 50,
                      height: 50,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    Sin imagen
                  </div>
                )}
                <div className="tarjeta-titulo">
                  {game && game.nombre ? game.nombre : `Juego ${i + 1}`}
                  <div className="tarjeta-genero">
                    {game && game.genero ? game.genero : "Género desconocido"}
                  </div>
                </div>
              </div>
            );
          })}

          <div className="tarjeta-libro">Libro 6</div>
          <div className="tarjeta-libro">Libro 7</div>
        </div>
      </section>
    </div>
  );
}
