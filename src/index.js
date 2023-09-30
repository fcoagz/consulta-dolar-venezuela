const { default: axios } = require("axios");

const urlBase = 'https://exchange.vcoud.com/'; // Hello World xD

function _convert_specific_format(text, character = '-') {
    const acentos = { 'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u' };
    for (const [acento, sin_acento] of Object.entries(acentos)) {
        text = text.toLowerCase().replace(acento, sin_acento).replace(' ', character);
    }
    return text;
}

function _convert_dollar_name_to_monitor_name(monitor_name) {
    if (monitor_name.split(' ')[0] === "Dólar" && monitor_name !== "Dólar Today") {
        if (monitor_name === "Dólar Monitor") {
            return "EnParaleloVzla";
        } else {
            return monitor_name.split(' ')[1];
        }
    }
    return monitor_name;
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
    let data = {};
    const response = await axios.get(urlBase + 'coins/latest');
    try {
        if (response.status !== 200) {
            throw new Error(`Error de comunicación CriptoDolar. Codigo: ${response.status}`);
        }

        const jsonResponse = response.data;

        for (const monitor of jsonResponse) {
            if (monitor.type.includes('bolivar') || monitor.type.includes('bancove')) {
                const result = {
                    title: _convert_dollar_name_to_monitor_name(monitor.name),
                    price: monitor.price,
                    price_old: monitor.priceOld,
                    type: monitor.type === 'bancove' ? 'bank' : 'monitor',
                    lastUpdate: monitor.updatedAt
                };

                data[_convert_specific_format(result.title)] = result;
            }
        }
        if (!(monitorCode in data)) {
            return data;
        }

        try {
            const monitorData = data[monitorCode.toLowerCase()];
            
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
   
    } catch (e) {
        console.error(e);
    }
}

module.exports = { getMonitor };