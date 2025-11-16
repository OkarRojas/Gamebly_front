// URL de tu API (cambia según desarrollo o producción)
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

export const fetchLibros = async (page = 1, limit = 10) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/libros?page=${page}&limit=${limit}`
    );
    if (!response.ok) throw new Error('Error al obtener libros');
    return response.json();
  } catch (error) {
    console.error('Error en fetchLibros:', error);
    throw error;
  }
};

export const fetchLibroPorId = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/libros/${id}`);
    if (!response.ok) throw new Error('Libro no encontrado');
    return response.json();
  } catch (error) {
    console.error('Error en fetchLibroPorId:', error);
    throw error;
  }
};

export const buscarLibros = async (query) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/libros/buscar/filtro?query=${query}`
    );
    if (!response.ok) throw new Error('Error en búsqueda');
    return response.json();
  } catch (error) {
    console.error('Error en buscarLibros:', error);
    throw error;
  }
};
