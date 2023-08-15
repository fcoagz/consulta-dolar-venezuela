const axios = require("axios").default;
const cheerio = require("cheerio");

const UrlBase = `https://exchangemonitor.net/dolar-venezuela`;

function convertSpecificFormat(text) {
  const acentos = { 'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u' };
  for (let [acento, sin_acento] of Object.entries(acentos)) {
    text = text.toLowerCase().replace(acento, sin_acento).replace(' ', '_');
  }
  return text;
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
  try {
    const response = await axios.get(UrlBase);
    if (response.status !== 200) {
      throw new Error(`Error de comunicación ExchangeMonitor. Codigo: ${response.status}`);
    }

    const $ = cheerio.load(response.data);

    let section_dolar_venezuela = $("div.row").find("div.col-xs-12.col-sm-6.col-md-4.col-tabla");
    let section_fecha_valor = $("div.col-xs-12.text-center");

    const allMonitors = {};

    const date = section_fecha_valor.find('p').html().split("<br>").slice(-1)[0].replace("</p>", "");
    allMonitors["value"] = {"date": date};

    section_dolar_venezuela.each((i, div) =>{
      const monitor = $(div).find("div.module-table.module-table-fecha");
      const text_price = monitor.find("p.precio").text().replace(',', '.');

      allMonitors[convertSpecificFormat(monitor.find("h6.nombre").text())] = {
        "title": monitor.find("h6.nombre").text(),
        "price": text_price.match(/\./g).length === 2 ? text_price.replace('.', '') : text_price,
        "change": monitor.find("p.cambio-por").text(),
        "lastUpdate": monitor.find("p.fecha").text().split(' ').slice(1).join(' ')
      };
    });

    monitorCode = monitorCode.toLowerCase();

    if (!(monitorCode in allMonitors)) {
      return allMonitors;
    } else if (prettify && nameProperty == "price") {
      return `Bs. ${allMonitors[monitorCode][nameProperty]}`;
    } else if (nameProperty in allMonitors[monitorCode]) {
      return allMonitors[monitorCode][nameProperty];
    } else {
      throw new Error("Consulte la documentación de la biblioteca: https://github.com/fcoagz/consulta-dolar-venezuela");
    }
  } catch (error) {
    console.error(`ValueError: ${error.message}`);
  }
}

module.exports = { getMonitor };