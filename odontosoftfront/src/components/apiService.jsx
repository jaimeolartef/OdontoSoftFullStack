// apiService.js
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';

/**
 * Maneja las respuestas de la API y extrae el campo 'data'
 * @param {Response} response - Respuesta de fetch
 * @returns {Promise<any>} - Retorna el campo 'data' de la respuesta
 */
const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message ?? '');
  }

  const result = await response.json();

  // Verificar si la respuesta tiene la estructura esperada
  if (result.success === false) {
    throw new Error(result.message || 'Error en la respuesta del servidor');
  }

  // Retornar solo el campo 'data'
  return result.data;
};

/**
 * Obtiene el token de autorización del sessionStorage
 * @returns {string|null} - Token de autorización
 */
const getAuthToken = () => {
  return sessionStorage.getItem('jsonwebtoken');
};

/**
 * Construye los headers por defecto para las peticiones
 * @param {boolean} includeAuth - Si incluir el token de autorización
 * @returns {Object} - Headers de la petición
 */
const getHeaders = (includeAuth = true) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  if (includeAuth) {
    const token = getAuthToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  return headers;
};

/**
 * Método GET genérico para consumir endpoints
 * @param {string} endpoint - Endpoint a consumir (ej: '/users', '/products/123')
 * @param {Object} options - Opciones adicionales
 * @param {boolean} options.includeAuth - Si incluir token de autorización (default: true)
 * @param {Object} options.queryParams - Parámetros de consulta
 * @returns {Promise<any>} - Retorna el campo 'data' de la respuesta
 */
export const apiGet = async (endpoint, options = {}) => {
  const {includeAuth = true, queryParams = {}} = options;

  try {
    // Construir URL con parámetros de consulta
    const url = new URL(`${API_BASE_URL}${endpoint}`);
    Object.keys(queryParams).forEach(key => {
      if (queryParams[key] !== undefined && queryParams[key] !== null) {
        url.searchParams.append(key, queryParams[key]);
      }
    });

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: getHeaders(includeAuth),
    });

    return await handleResponse(response);
  } catch (error) {
    console.error(`Error en GET ${endpoint}:`, error);
    throw error;
  }
};

/**
 * Método POST genérico para consumir endpoints
 * @param {string} endpoint - Endpoint a consumir (ej: '/users', '/login')
 * @param {Object} data - Datos a enviar en el body
 * @param {Object} options - Opciones adicionales
 * @param {boolean} options.includeAuth - Si incluir token de autorización (default: true)
 * @returns {Promise<any>} - Retorna el campo 'data' de la respuesta
 */
export const apiPost = async (endpoint, data = {}, options = {}) => {
  const {includeAuth = true} = options;

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: getHeaders(includeAuth),
      body: JSON.stringify(data),
    });

    return await handleResponse(response);
  } catch (error) {
    console.error(`Error en POST ${endpoint}:`, error);
    throw error;
  }
};

/**
 * Método PUT genérico para consumir endpoints
 * @param {string} endpoint - Endpoint a consumir
 * @param {Object} data - Datos a enviar en el body
 * @param {Object} options - Opciones adicionales
 * @param {boolean} options.includeAuth - Si incluir token de autorización (default: true)
 * @returns {Promise<any>} - Retorna el campo 'data' de la respuesta
 */
export const apiPut = async (endpoint, data = {}, options = {}) => {
  const {includeAuth = true} = options;

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: getHeaders(includeAuth),
      body: JSON.stringify(data),
    });

    return await handleResponse(response);
  } catch (error) {
    console.error(`Error en PUT ${endpoint}:`, error);
    throw error;
  }
};
