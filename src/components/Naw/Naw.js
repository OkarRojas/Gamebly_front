import React from 'react';
import './Naw.css';

function Naw () {
    return (
        <div>
            <nav className='Naw'>
                <div className="cuadrado">
                    {/* Imagen directa del contenido de Pinterest */}
                    <h5>Welcome Back</h5>
                    <img
                        src="https://i.pinimg.com/736x/1f/df/9d/1fdf9d1bbd4a0682f5c8ac8c96628286.jpg"
                        alt="Logo Gamebly"
                        className="Naw-image"
                    />
                    <h4>Okar Rojas</h4>
                </div>
                <ul>
                    <li>your library</li>
                    <li>New Games</li>
                    <li>Home</li>
                    <li>etc...</li>
                </ul>
            </nav>
        </div>
    );
}

export default Naw;