import { Persona } from './Persona.js';
import { Asignatura } from './Asignatura.js';

/**
 * Clase que representa a un estudiante.
 * @extends Persona
 * @class
 */
export class Estudiante extends Persona {



    /**
     * Crea una instancia de Estudiante.
     * @param {number} id - Identificador único del estudiante.
     * @param {string} nombre - Nombre del estudiante.
     * @param {number} edad - Edad del estudiante.
     * @param {Direccion} direccion - Dirección del estudiante.
     */
    constructor(id, nombre, edad, direccion) {
        super(id, nombre, edad, direccion);
        this._asignaturas = [];
    }

    /**
     * Obtiene las asignaturas en las que el estudiante está matriculado.
     * @returns {Array} Lista de asignaturas.
     */
    get asignaturas() {
        return [...this._asignaturas];
    }

    /**
     * Matricula al estudiante en una asignatura.
     * @param {string} nombreAsignatura - Nombre de la asignatura en la que matricular al estudiante.
     * @param {ListaEstudiantes} listaEstudiantes - Objeto que gestiona la lista de estudiantes.
     * @param {Array<Asignatura>} asignaturasDisponibles - Lista de asignaturas disponibles en el sistema.
     * @throws {Error} Si el estudiante ya está matriculado en la asignatura.
     */
    matricular(nombreAsignatura, listaEstudiantes, asignaturasDisponibles) {
        try {
            const asignatura = listaEstudiantes.buscarAsignaturaPorNombre(nombreAsignatura, asignaturasDisponibles);

            if (!this._asignaturas.some(a => a.asignatura === asignatura)) {
                this._asignaturas.push({ asignatura, fechaMatricula: new Date().toLocaleDateString("es-ES") });
                asignatura.agregarEstudiante(this);
                console.log(`Estudiante ${this.nombre} matriculado en ${asignatura.nombre}.`);
            } else {
                throw new Error(`El estudiante ya está matriculado en ${asignatura.nombre}.`);
            }
        } catch (error) {
            console.error("Error en la matriculación:", error.message);
        }
    }

    /**
     * Desmatricula al estudiante de una asignatura.
     * @param {string} nombreAsignatura - Nombre de la asignatura de la que desmatricular al estudiante.
     * @param {ListaEstudiantes} listaEstudiantes - Objeto que gestiona la lista de estudiantes.
     * @param {Array<Asignatura>} asignaturasDisponibles - Lista de asignaturas disponibles en el sistema.
     * @throws {Error} Si el estudiante no está matriculado en la asignatura.
     */
    desmatricular(nombreAsignatura, listaEstudiantes, asignaturasDisponibles) {
        try {
            const asignatura = listaEstudiantes.buscarAsignaturaPorNombre(nombreAsignatura, asignaturasDisponibles);

            const index = this._asignaturas.findIndex(a => a.asignatura === asignatura);

            if (index !== -1) {
                this._asignaturas.splice(index, 1);
                asignatura.eliminarEstudiante(this);
                console.log(`Estudiante ${this.nombre} desmatriculado de ${asignatura.nombre}.`);
            } else {
                throw new Error(`El estudiante no está matriculado en ${asignatura.nombre}.`);
            }
        } catch (error) {
            console.error("Error en la desmatriculación:", error.message);
        }
    }

    /**
 * Calcula el promedio de todas las asignaturas en las que el estudiante está matriculado.
 * @returns {string} Promedio de las calificaciones.
 * @throws {Error} Si el estudiante no tiene asignaturas matriculadas o no hay calificaciones.
 */
    promedioIndividual() {
        try {
            if (this._asignaturas.length === 0) throw new Error("El estudiante no tiene asignaturas matriculadas.");
            const notas = this._asignaturas.flatMap(a => a.asignatura.obtenerNotas(this));
            if (notas.length === 0) throw new Error("No hay calificaciones disponibles.");

            const promedio = (notas.reduce((sum, val) => sum + val, 0) / notas.length).toFixed(2);

            return promedio;
        } catch (error) {
            console.error("Error al calcular promedio:", error.message);
        }
    }

    /**
     * Muestra en consola las asignaturas en las que el estudiante está matriculado.
     */
    mostrarAsignaturas() {
        console.log(`Asignaturas de ${this.nombre}:`);
        this._asignaturas.forEach(a => console.log(`- ${a.asignatura.nombre}`));
    }

    /**
     * Devuelve la representación en cadena del estudiante.
     * @returns {string} Representación en cadena del estudiante.
     */
    toString() {
        return `${super.toString()}, ${this._asignaturas.length > 0 ? `Asignaturas matriculadas: ${this._asignaturas.length}` : "No tiene asignaturas matriculadas."}`;
    }
}
