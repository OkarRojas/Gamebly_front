import React from 'react';
import { Link } from 'react-router-dom'; // ← AGREGA ESTO
import './Naw.css';
import '../config.css';
import { foto_perfil, user_name } from '../config';

function Naw () {
    return (
        <div>
            <nav className='Naw'>
                <h1><Link to="/Gamebly_front">Gamebly</Link></h1>
                <div className="cuadrado">
                    <h5>Welcome Back</h5>
                    <img
                        src={foto_perfil}
                        alt="Logo Gamebly"
                        className="Naw-image"
                    />
                    <h4>{user_name}</h4>
                </div>
                <ul>
                    <li><Link to="/Gamebly_front">Home</Link></li>
                    <li><Link to="/about">your library</Link></li>
                    <li><Link to="/new-games">New Games</Link></li> {/* ← CAMBIO */}
                    <li><Link to="/recommendations">Recomendaciones</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                </ul>
            </nav>
        </div>
    );
}

export default Naw;
