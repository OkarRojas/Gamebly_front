import React, { useEffect, useRef } from "react";
import "./recently_played.css";

export default function RecentlyPlayed() {
  const contenedorRef = useRef(null);
  const pointerOverRef = useRef(false);

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

      // MOUSE FIX: Siempre mover horizontalmente con rueda de mouse
      // Trackpad: solo mover si el scroll es principalmente vertical
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

  return (
    <div className="recently-played">
      <section className="seccion-carrusel">
        <div className="header-r">
            <h3>Games you played last</h3>
            <a href="URL_a_donde_quieres_redireccionar">see more</a>
        </div>
        <div ref={contenedorRef} className="contenedor-tarjetas">

          <div className="tarjeta-libro">Libro 1</div>
          <div className="tarjeta-libro">Libro 2</div>
          <div className="tarjeta-libro">Libro 3</div>
          <div className="tarjeta-libro">Libro 4</div>
          <div className="tarjeta-libro">Libro 5</div>
          <div className="tarjeta-libro">Libro 6</div>
          <div className="tarjeta-libro">Libro 7</div>
        </div>
      </section>
    </div>
  );
}