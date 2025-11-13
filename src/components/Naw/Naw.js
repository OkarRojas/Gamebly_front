import React from 'react';
import './Naw.css';
import '../config.css';
import { foto_perfil, user_name } from '../config';

function Naw () {
    return (
        <div>
            <nav className='Naw'>
                <div className="cuadrado">
                    {/* Imagen directa del contenido de Pinterest */}
                    <h5>Welcome Back</h5>
                    <img
                        src={foto_perfil}
                        alt="Logo Gamebly"
                        className="Naw-image"
                    />
                    <h4>{user_name}</h4>
                </div>
                <ul>
                    <li>your library</li>
                    <li>New Games</li>
                    <li>Recomendaciones</li>
                    <li>etc...</li>
                </ul>
            </nav>
        </div>
    );
}

export default Naw;