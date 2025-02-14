# **Modularización del Código - Task 4.4 - Organizing Code**

## **Descripción**
Para esta tarea, he reutilizado el código de la **Tarea 4.3-jsDoc**, ya que en ella el código ya estaba correctamente comentado utilizando **JSDoc**.

El objetivo principal de esta tarea ha sido **modularizar** el código, separando cada clase en su propio archivo y asegurando una correcta importación y exportación entre los distintos módulos.

## **Proceso de Modularización**
La modularización se ha realizado de la siguiente manera:

1. **Separación de Clases**
   - Cada clase se ha colocado en su propio archivo **`.js`** correspondiente.
   - Se ha asegurado que cada clase exporte correctamente su funcionalidad.

2. **Importación y Exportación**
   - Se ha utilizado la sintaxis de **ES Modules (`import` y `export`)** para organizar el código.
   - Se han importado las clases necesarias en los archivos donde se requieren.

### **Ejemplo de Importación**
En la clase `ListaEstudiantes`, es necesario importar la clase `Estudiante` para su uso.

```javascript
import { Estudiante } from './Estudiante.js';
```

### **Ejemplo de Exportación de una Clase**
Para exportar una clase desde su módulo y hacerla accesible en otros archivos, se usa:

```javascript
export class ListaEstudiantes {
    // Implementación de la clase
}
```


