const axios = require('axios');
const cheerio = require('cheerio');

const $monitor = async() => {
  const webResult = await axios.get('https://monitordolarvenezuela.com/');
  const $ = cheerio.load(webResult.data)

  const formatHTML = $("div.row.text-center").find("div.col-12.col-sm-4.col-md-2.col-lg-2");

  const priceResult = new Array();

  formatHTML.each((i, div) =>{
    const text = $(div).find('p').text();

    return priceResult.push(text.replace(',', '.'));
  });
  return {
    $bcv: `Bs. ${priceResult[0].split(' ')[2]}`, // BCV
    $enparalelovzla: `Bs. ${priceResult[1].split(' ')[2]}`, // EnParaleloVzla3
    $dolartoday: `Bs. ${priceResult[2].split(' ')[2]}`, // DolarToday
    $monitordolarweb: `Bs. ${priceResult[3].split(' ')[2]}`, // MonitorDolarWeb
    $enparalelovzlavip: `Bs. ${priceResult[4].split(' ')[2]}`, // EnParaleloVzlaVip 
    $binancep2p: `Bs. ${priceResult[5].split(' ')[2]}` // Binance P2P
  };
};

  module.exports = { $monitor }