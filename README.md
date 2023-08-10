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
const consultaDolar = require("consulta-dolar-venezuela");

consultaDolar.getMonitor("null").then($ =>{console.log($)}); /*Obtener los valores de todos los monitores*/

consultaDolar.getMonitor("EnParaleloVzla", "price", false).then($ =>{console.log($)}); /*Obtener el valor del dólar en EnParaleloVzla*/

consultaDolar.getMonitor("BCV", "lastUpdate").then($ =>{console.log($)}); /*Obtener la ultima actualizacion del dólar en BCV*/
```