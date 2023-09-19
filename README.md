# consulta-dolar-venezuela
consulta-dolar-venezuela es una librería de Node.JS que te permite obtener los valores del dólar en diferentes monitores en Venezuela. La librería es fácil de usar y ofrece una manera rápida y eficiente de obtener información relevante sobre el mercado cambiario en Venezuela.

## Instalación
```
npm install consulta-dolar-venezuela
```

## Uso
El método `getMonitor` de la librería consulta-dolar-venezuela te permite obtener los valores del dólar en diferentes monitores en Venezuela.

Los parametros del metodo ante mencionado son los siguientes:

- `monitorCode`: El código del monitor que se desea obtener.
- `nameProperty`: La propiedad específica que se desea obtener del monitor.
- `prettify`: Indica si se debe formatear el resultado obtenido. [Bs. Valor]

### Ejemplo
```javascript
const { getMonitor } = require("consulta-dolar-venezuela");

getMonitor("null").then($ =>{console.log($)}); /*Obtener los valores de todos los monitores*/

getMonitor("EnParaleloVzla", "price", false).then($ =>{console.log($)}); /*Obtener el valor del dólar en EnParaleloVzla*/

getMonitor("BCV", "lastUpdate").then($ =>{console.log($)}); /*Obtener la ultima actualizacion del dólar en BCV*/
```

El método `getDate` de la librería consulta-dolar-venezuela obtienes la hora actual en Venezuela.

El parametro del metodo ante mencionado es el siguiente:

- `dateOrTime`: La propiedad específica que se desea obtener del tiempo `date` || `time` || `all`.

### Ejemplo
```javascript
const { getDate } = require("consulta-dolar-venezuela");

getDate("all").then($ =>{console.log($)}); /*Obtener un objecto de los valores `date` y `time`*/

getDate("time").then($ =>{console.log($)}); /*Obtener el valor del tiempo`*/
```