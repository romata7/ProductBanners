/**
 * Debounce function para limitar la frecuencia de ejecución de una función
 * @param {Function} func - Función a ejecutar
 * @param {number} wait - Tiempo de espera en milisegundos
 * @param {boolean} immediate - Si se ejecuta inmediatamente primero
 * @returns {Function} Función debounceada
 */
export const debounce = (func, wait = 300, immediate = false) => {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;

        const later = () => {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };

        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);

        if (callNow) func.apply(context, args);
    };
};

/**
 * Formatea un número como moneda
 * @param {number} value - Valor a formatear
 * @param {string} currency - Código de moneda (ej: 'PEN')
 * @returns {string} Valor formateado como moneda
 */
export const formatCurrency = (value, currency = 'PEN') => {
    return new Intl.NumberFormat('es-PE', {
        style: 'currency',
        currency,
        minimumFractionDigits: 2
    }).format(value);
};

/**
 * Valida un DNI peruano
 * @param {string} dni - Número de DNI a validar
 * @returns {boolean} True si es válido
 */
export const isValidDNI = (dni) => {
    if (!dni || dni.length !== 8) return false;
    return /^\d+$/.test(dni);
};

/**
 * Valida un RUC peruano
 * @param {string} ruc - Número de RUC a validar
 * @returns {boolean} True si es válido
 */
export const isValidRUC = (ruc) => {
    if (!ruc || ruc.length !== 11) return false;
    return /^\d+$/.test(ruc);
};

/**
 * Capitaliza la primera letra de un string
 * @param {string} str - String a capitalizar
 * @returns {string} String capitalizado
 */
export const capitalize = (str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Función para dormir la ejecución (útil para testing)
 * @param {number} ms - Milisegundos a esperar
 * @returns {Promise} Promesa que se resuelve después del tiempo especificado
 */
export const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Maneja errores de API de forma consistente
 * @param {Error} error - Error capturado
 * @returns {string} Mensaje de error amigable
 */
export const handleApiError = (error) => {
    console.error('API Error:', error);

    if (error.response) {
        // Error con respuesta del servidor
        switch (error.response.status) {
            case 400:
                return 'Datos inválidos enviados al servidor';
            case 401:
                return 'No autorizado - por favor inicie sesión';
            case 404:
                return 'Recurso no encontrado';
            case 500:
                return 'Error interno del servidor';
            default:
                return `Error del servidor: ${error.response.status}`;
        }
    } else if (error.request) {
        // Error sin respuesta del servidor
        return 'No se pudo conectar con el servidor';
    } else {
        // Error en la configuración de la solicitud
        return 'Error al configurar la solicitud';
    }
};