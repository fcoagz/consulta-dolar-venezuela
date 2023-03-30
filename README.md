# consulta-dolar-venezuela
Esta es una libreria desarrollado en Node.JS te permite consultar los precios del dólar en diferente monitores en Venezuela.

## Instalación
Para instalar esta librería, puedes utilizar el siguiente comando de npm:

```
npm install consulta-dolar-venezuela
```

## Uso
1. Importamos la librería:

```js
const consultaDolar = require('consulta-dolar-venezuela');
```
2. Para consultar la libreria tiene funcion asicronica por lo tanto para consultar se debe consultar de la siguiente manera:

```js
const consultaDolar = require('consulta-dolar-venezuela');

const consultaDolar.$monitor().then($=>{console.log($)})

> {
  '$bcv': 'Bs. 24,497',
  '$enparalelovzla': 'Bs. 25,11',
  '$dolartoday': 'Bs. 25,15',
  '$monitordolarweb': 'Bs. 25,02',
  '$enparalelovzlavip': 'Bs. 25,04',
  '$binancep2p': 'Bs. 25,020'
  }
```
Se retorna una estructura en JSON.

3. Para acceder uno de ellos debemos hacer de la siguiente manera:

```js
const consultaDolar = require('consulta-dolar-venezuela');

const consultaDolar.$monitor().then($=>{console.log($['$bcv'])})

> Bs. 24,497
```