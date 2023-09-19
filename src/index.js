const { default: axios } = require("axios");

// pyDolarVenezuela API by Francisco Griman
// Documentation: https://github.com/fcoagz/api-pydolarvenezuela
const urlBase = 'https://pydolarvenezuela-api.vercel.app/';

/**
 * Obtener contenido de la página.
 * 
 * @param {string} url - Page URL
 * @returns {Promise<any>}
 */
async function getContentPage(url) {
    try {
        const response = await axios.get(url);
        if (response.status !== 200) {
            throw new Error(`Error de comunicación pyDolarVenezuela-API. Codigo: ${response.status}`);
        }

        return response.data;
    } catch (error) {
        console.error(`ValueError: ${error.message}`);
    }
}

/**
 * Obtiene información del monitor de cambio en Venezuela.
 *
 * @param {string} monitorCode - El código del monitor que se desea obtener. 
 * @param {string} nameProperty - La propiedad específica que se desea obtener del monitor.
 * @param {boolean} prettify - Indica si se debe formatear el resultado obtenido.
 * @returns {Promise<string|object>} Un objeto con la información solicitada o una cadena de texto en caso de formateo especial.
 */
async function getMonitor(monitorCode, nameProperty, prettify) {
    const response = await getContentPage(urlBase + 'api/v1/dollar/');
    const allMonitors = response['monitors'];

    if (!(monitorCode in allMonitors)) {
        return allMonitors;
    }

    try {
        const monitorData = allMonitors[monitorCode.toLowerCase()];
        
        if (nameProperty) {
            const value = monitorData[nameProperty];
            if (value === undefined) {
                throw new Error("Consulte la documentación de la biblioteca: https://github.com/fcoagz/consulta-dolar-venezuela");
            } else {
                return nameProperty === 'price' && prettify ? `Bs. ${value}` : value;
            }
        } else {
            return monitorData;
        }
    } catch (error) {
        console.error(`KeyError: ${error.message}`);
    }
}

/**
 * Bbtener la hora actual en Venezuela.
 *
 * @param {string} dateOrTime - La propiedad específica que se desea obtener del tiempo `date` || `time`. 
 * @returns {Promise<string|object>} Un objeto con la información solicitada o una cadena de texto en caso de formateo especial.
 */
async function getDate(dateOrTime) {
    try {
    const response = await getContentPage(urlBase + 'api/v1/dollar/fecha');
    
     if (dateOrTime === 'all') {
         return response['datetime'];
     } else if (dateOrTime in response['datetime']) {
         return response['datetime'][dateOrTime];
     } else {
         throw new Error("Consulte la documentación de la biblioteca: https://github.com/fcoagz/consulta-dolar-venezuela");
     }
    } catch (error) {
    console.error(`KeyError: ${error.message}`);
    }
}

module.exports = { getMonitor, getDate }