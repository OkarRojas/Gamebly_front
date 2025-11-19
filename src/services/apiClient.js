// URL de tu API backend
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

// ✅ Obtener todos los juegos con paginación
export const fetchJuegos = async (page = 1, limit = 10) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/games?page=${page}&limit=${limit}`
    );
    if (!response.ok) throw new Error('Error al obtener juegos');
    return response.json();
  } catch (error) {
    console.error('Error en fetchJuegos:', error);
    throw error;
  }
};

// ✅ Obtener juegos jugados recientemente
export const fetchJuegosRecientes = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/games/recientes/ultimos`);
    if (!response.ok) throw new Error('Error al obtener juegos recientes');
    return response.json();
  } catch (error) {
    console.error('Error en fetchJuegosRecientes:', error);
    throw error;
  }
};

// ✅ Obtener juegos en biblioteca
export const fetchBiblioteca = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/games/biblioteca/mis-juegos`);
    if (!response.ok) throw new Error('Error al obtener biblioteca');
    return response.json();
  } catch (error) {
    console.error('Error en fetchBiblioteca:', error);
    throw error;
  }
};

// ✅ Obtener un juego por ID
export const fetchJuegoPorId = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/games/${id}`);
    if (!response.ok) throw new Error('Juego no encontrado');
    return response.json();
  } catch (error) {
    console.error('Error en fetchJuegoPorId:', error);
    throw error;
  }
};

// ✅ Buscar juegos
export const buscarJuegos = async (query, genero = null) => {
  try {
    let url = `${API_BASE_URL}/games/buscar/filtro?query=${query}`;
    if (genero) url += `&genero=${genero}`;
    
    const response = await fetch(url);
    if (!response.ok) throw new Error('Error en búsqueda');
    return response.json();
  } catch (error) {
    console.error('Error en buscarJuegos:', error);
    throw error;
  }
};
