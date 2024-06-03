# consulta-dolar-venezuela
consulta-dolar-venezuela es una librería de Node.JS que te permite obtener los valores del dólar en diferentes monitores en Venezuela. La librería es fácil de usar y ofrece una manera rápida y eficiente de obtener información relevante sobre el mercado cambiario en Venezuela.

## Instalación
```
npm install consulta-dolar-venezuela
```

## Uso
La clase `pyDolarVenezuela` de la librería te permite obtener los valores del dólar en diferentes monitores en Venezuela. [Más información](https://github.com/fcoagz/api-pydolarvenezuela)

Los métodos disponibles en la clase son los siguientes:

- `getMonitor(monitorCode)`: Este método te permite obtener los valores de un monitor específico. El parámetro `monitorCode` es el código del monitor que se desea obtener.
- `getAllMonitors()`: Este método te permite obtener los valores de todos los monitores.

### Ejemplo
```javascript
const { pyDolarVenezuela } = require("consulta-dolar-venezuela");

const pyDolar = new pyDolarVenezuela('bcv');

pyDolar.getAllMonitors().then($ =>{console.log($)}); /*Obtener los valores de todos los monitores*/

pyDolar.getMonitor("USD").then($ =>{console.log($)}); /*Obtener el valor del dólar en BCV*/
```