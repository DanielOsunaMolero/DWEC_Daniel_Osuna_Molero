# Proyecto SGAEA

## Descripción
Este proyecto es un sistema de gestión de estudiantes y asignaturas (SGAEA). Permite administrar estudiantes, asignaturas, matrículas y calificaciones mediante una estructura orientada a objetos en JavaScript.

## Estructura del Proyecto

El proyecto está compuesto por las siguientes clases:

- **Direccion**: Representa la dirección de un estudiante.
- **Persona**: Clase base para representar a una persona con nombre, edad y dirección.
- **Estudiante**: Extiende la clase `Persona` y permite gestionar asignaturas y notas.
- **Asignatura**: Contiene la información de una materia y sus estudiantes matriculados.
- **ListaEstudiantes**: Administra el conjunto de estudiantes y sus interacciones.

Adicionalmente, se ha implementado un programa principal que permite interactuar con el sistema a través de un menú en consola.

## Flujo de Trabajo
1. Se inicializan los datos de prueba con estudiantes y asignaturas.
2. El usuario puede agregar y eliminar estudiantes.
3. Los estudiantes pueden ser matriculados y desmatriculados de asignaturas.
4. Se pueden asignar notas a los estudiantes y calcular sus promedios.
5. Se genera documentación automática con **JSDoc** para facilitar el mantenimiento del código.

## Configuración
### 1. Instalación de Dependencias
Para ejecutar correctamente el proyecto, es necesario instalar las dependencias ejecutando:

```bash
npm install
```

### 2. Generar Documentación
Para generar la documentación del código, usa el siguiente comando:

```bash
npm run documenta
```

Esto creará la documentación en el directorio `documentacion/`.

### 3. Limpiar el Proyecto
Para eliminar archivos innecesarios, como `node_modules` y la documentación generada, ejecuta:

```bash
npm run limpia
```

### 4. Ejecutar el Programa
Para ejecutar el programa, puedes seguir cualquiera de estas opciones:

1. **Ejecutarlo en consola:**
   - Abre la terminal en el directorio del proyecto y usa:
     ```bash
     node Proyecto.js
     ```

2. **Ejecutarlo en un navegador con Live Server:**
   - Descarga o clona el repositorio.
   - Abre el proyecto en Visual Studio Code.
   - Instala y activa la extensión **Live Server**.
   - Haz clic derecho en `index.html` y selecciona **"Open with Live Server"**.
   - Abre la consola del navegador para ver la ejecución del programa.

## Requisitos
- Node.js instalado
- Editor de código recomendado: Visual Studio Code

## Notas
Si deseas modificar el código, asegúrate de actualizar la documentación con `npm run documenta` después de los cambios.

## Autor
Desarrollado por Daniel Osuna Molero. 🚀

