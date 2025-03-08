import { Estudiante } from './Estudiante.js';

/**
 * Clase que administra una lista de estudiantes.
 * @class
 */
export class ListaEstudiantes {
    /**
     * Crea una instancia de ListaEstudiantes.
     */
    constructor() {
        this.listaEstudiantes = {};
        this.idActual = 1;
    }

    /**
     * Agrega un nuevo estudiante a la lista.
     * @param {string} nombre - Nombre del estudiante.
     * @param {number} edad - Edad del estudiante.
     * @param {Direccion} direccion - Dirección del estudiante.
     */
    agregarEstudiante(nombre, edad, direccion) {
        const nuevoEstudiante = new Estudiante(this.idActual, nombre, edad, direccion);
        this.listaEstudiantes[this.idActual] = nuevoEstudiante;
        console.log(`Estudiante ${nombre} añadido con éxito.`);
        this.idActual++;
    }

    /**
     * Elimina un estudiante de la lista por su ID.
     * @param {number} id - ID del estudiante a eliminar.
     * @throws {Error} Si el ID no es válido o el estudiante no existe.
     */
    eliminarEstudiante(id) {
        try {
            if (isNaN(id)) throw new Error("ID inválido. Por favor, introduce un número válido.");
            const estudiante = this.listaEstudiantes[id];
            if (!estudiante) throw new Error(`No se encontró un estudiante con ID ${id}.`);

            estudiante.asignaturas.forEach(a => {
                a.asignatura.eliminarEstudiante(estudiante);
            });

            delete this.listaEstudiantes[id];
            console.log(`Estudiante con ID ${id} eliminado y desmatriculado de todas las asignaturas.`);
        } catch (error) {
            console.error("Error al eliminar estudiante:", error.message);
        }
    }
    
    /**
     * Muestra en consola todos los estudiantes registrados.
     * @throws {Error} Si no hay estudiantes registrados.
     */
    mostrarEstudiantes() {
        try {
            const estudiantes = Object.values(this.listaEstudiantes);
            if (estudiantes.length === 0) throw new Error("No hay estudiantes registrados.");

            console.log("Lista de estudiantes:");
            estudiantes.forEach(est => {
                console.log(est.toString());
                est.mostrarAsignaturas();
            });
        } catch (error) {
            console.error("Error al mostrar estudiantes:", error.message);
        }
    }

    /**
     * Calcula el promedio general de todos los estudiantes.
     * @returns {string} Promedio general de calificaciones.
     * @throws {Error} Si no hay estudiantes o calificaciones disponibles.
     */
    promedioGeneral() {
        try {
            const estudiantesArray = Object.values(this.listaEstudiantes);
            if (estudiantesArray.length === 0) throw new Error("No hay estudiantes registrados.");

            const promedios = estudiantesArray.map(est => parseFloat(est.promedioIndividual())).filter(p => !isNaN(p));
            if (promedios.length === 0) throw new Error("No hay promedios disponibles para calcular.");

            const promedioGeneral = (promedios.reduce((sum, val) => sum + val, 0) / promedios.length).toFixed(2);
            return promedioGeneral;
        } catch (error) {
            console.error("Error al calcular promedio general de todos los estudiantes:", error.message);
        }
    }
    
    /**
     * Busca una asignatura por su nombre en la lista de asignaturas disponibles.
     * @param {string} nombreAsignatura - Nombre de la asignatura a buscar.
     * @param {Array<Asignatura>} asignaturasDisponibles - Lista de asignaturas disponibles.
     * @returns {Asignatura} Asignatura encontrada.
     * @throws {Error} Si la asignatura no se encuentra en la lista.
     * @throws {Error} Si no se proporciona un nombre de asignatura válido.
     * @throws {Error} Si no hay asignaturas disponibles.
     * @throws {Error} Si no se proporciona una lista de asignaturas.
     **/
    buscarAsignaturaPorNombre(nombreAsignatura, asignaturasDisponibles) {
        const asignatura = asignaturasDisponibles.find(a => a.nombre === nombreAsignatura);
        if (!asignatura) {
            throw new Error(`Asignatura '${nombreAsignatura}' no encontrada.`);
        }
        return asignatura;
    }

    /**
     * Busca un estudiante por su nombre.
     * @param {string} patron - Patrón o nombre a buscar.
     * @returns {Estudiante|null} Estudiante encontrado o null si no se encuentra.
     */
    buscarEstudiantePorNombre(patron) {
        try {
            // Imprime la lista de estudiantes para verificar que está correctamente cargada
    
            // Convierte la lista de estudiantes en un array y filtra aquellos cuyo nombre coincide con el patrón
            const resultados = Object.values(this.listaEstudiantes).filter(est =>
                est.nombre && est.nombre.toLowerCase().trim().includes(patron.toLowerCase().trim())
            );
            
    
            // Si no se encuentran coincidencias, muestra un mensaje de error y devuelve null
            if (resultados.length === 0) {
                console.error(`No se encontraron estudiantes con el nombre: '${patron}'`);
                return null;
            } else if (resultados.length > 1) {
                // Si hay múltiples coincidencias, muestra los resultados y un mensaje de error
                console.log("Se encontraron múltiples estudiantes:");
                resultados.forEach(est => console.log(est.toString()));
                console.error("Por favor, especifica un nombre más preciso.");
                return null;
            }
    
            // Devuelve el estudiante encontrado si solo hay uno
            return resultados[0];
        } catch (error) {
            // Maneja internamente cualquier error ocurrido durante la búsqueda
            console.error("Error en la búsqueda del estudiante:", error.message);
            return null;
        }
    }
}