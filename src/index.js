const { default: axios } = require("axios");

const API_BASE = 'https://pydolarvenezuela-api.vercel.app/api/v1/dollar';

async function request(url, params = {}) {
  try {
    const response = await axios.get(url, { params });
    return response.data;
  } catch (error) {
    throw error;
  }
}

/**
 * Clase para interactuar con la API de pyDolarVenezuela.
 */
class pyDolarVenezuela {
  /**
   * Crea una nueva instancia de pyDolarVenezuela.
   * @param {string} page - La página a la que se accederá. 
   * @throws {Error} Si la página proporcionada no es válida.
   */
  constructor(page) {
    const validPages = ['alcambio', 'bcv', 'exchangemonitor', 'criptodolar', 'italcambio'];
    if (!validPages.includes(page)) {
      throw new Error('Invalid page');
    }
    this.page = page;
  }

  /**
   * Obtiene los datos de un monitor específico.
   * @param {string} monitorCode - El código del monitor a obtener.
   * @returns {Object} Los datos del monitor.
   */
  async getMonitor(monitorCode) {
    const response = await request(API_BASE, { page: this.page, monitor: monitorCode.toLowerCase() });
    return response;
  }

  /**
   * Obtiene los datos de todos los monitores.
   * @returns {Object} Los datos de todos los monitores.
   */
  async getAllMonitors() {
    const response = await request(API_BASE, { page: this.page });
    return response;
  }
}

module.exports = { pyDolarVenezuela };