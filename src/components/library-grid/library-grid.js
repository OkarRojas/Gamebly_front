import React from "react";
import './library-grid.css';

function LibraryGrid() {
    return (
        <div className="library-section">
            <div className="library-header">
                <h3>My Library</h3>
                <a href="URL_a_donde_quieres_redireccionar">see more</a>
            </div>
            
            <div className="biblioteca-grid">
                <div className="tarjeta-juego">
                    <img src="juego1.jpg" alt="Título del Juego" />
                    <h4>Título del Juego 1</h4>
                </div>
                <div className="tarjeta-juego">
                    <h4>Juego 2</h4>
                </div>
                <div className="tarjeta-juego">
                    <h4>Juego 3</h4>
                </div>
                <div className="tarjeta-juego">
                    <h4>Juego 4</h4>
                </div>
            </div>
        </div>
    );
}

export default LibraryGrid;