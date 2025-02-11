import { Estudiante } from './Estudiante.js';

/**
 * Clase que representa una asignatura.
 * @class
 */
export class Asignatura {
    /**
     * Crea una instancia de Asignatura.
     * @param {string} nombre - Nombre de la asignatura.
     */
    constructor(nombre) {
        this.nombre = nombre;
        this.listaEstudiantes = [];
        this.calificaciones = [];
    }

    /**
     * Agrega un estudiante a la asignatura e inicializa su registro de calificaciones.
     * @param {Estudiante} estudiante - Estudiante a agregar.
     */
    agregarEstudiante(estudiante) {
        if (!estudiante || !estudiante.nombre) {
            console.error("El estudiante no tiene un nombre válido.");
            return;
        }

        if (!this.listaEstudiantes.some(e => e.id === estudiante.id)) {
            this.listaEstudiantes.push(estudiante);
            this.calificaciones.push({ estudiante, calificaciones: [] });
            console.log(`Estudiante ${estudiante.nombre} agregado a la asignatura ${this.nombre}.`);
        } else {
            console.log(`El estudiante ${estudiante.nombre} ya está matriculado en ${this.nombre}.`);
        }
    }

    /**
     * Asigna una nota a un estudiante en la asignatura.
     * @param {Estudiante} estudiante - Estudiante al que asignar la nota.
     * @param {number} nota - Nota a asignar (entre 0 y 10).
     * @throws {Error} Si el estudiante no está matriculado o la nota es inválida.
     */
    asignarNota(estudiante, nota) {
        try {
            if (!estudiante) throw new Error("Estudiante no encontrado.");
            if (!this.listaEstudiantes.some(e => e.id === estudiante.id)) {
                throw new Error(`El estudiante ${estudiante.nombre} no está matriculado en ${this.nombre}.`);
            }
            if (isNaN(nota) || nota < 0 || nota > 10) {
                throw new Error("Nota inválida. Debe estar entre 0 y 10.");
            }

            const registro = this.calificaciones.find(c => c.estudiante.id === estudiante.id);
            registro.calificaciones.push(nota);
            console.log(`Nota ${nota} asignada a ${estudiante.nombre} en ${this.nombre}.`);
        } catch (error) {
            console.error("Error al asignar nota:", error.message);
        }
    }

    /**
     * Obtiene las notas de un estudiante en la asignatura.
     * @param {Estudiante} estudiante - Estudiante cuyas notas se desean obtener.
     * @returns {Array} Lista de calificaciones del estudiante.
     */
    obtenerNotas(estudiante) {
        const registro = this.calificaciones.find(c => c.estudiante.id === estudiante.id);
        return registro ? registro.calificaciones : [];
    }

    /**
     * Calcula el promedio de todas las calificaciones de la asignatura.
     * @returns {string} Promedio de las calificaciones o mensaje si no hay calificaciones.
     */
    calcularPromedio() {
        const todasLasNotas = this.calificaciones.flatMap(c => c.calificaciones);
        return todasLasNotas.length
            ? (todasLasNotas.reduce((sum, val) => sum + val, 0) / todasLasNotas.length).toFixed(2)
            : "No hay calificaciones disponibles.";
    }

    /**
     * Muestra en consola los estudiantes matriculados en la asignatura.
     */
    mostrarEstudiantes() {
        console.log(`Estudiantes matriculados en ${this.nombre}:`);
        this.listaEstudiantes.forEach(est => console.log(`- ${est.nombre}`));
    }
    
    /**
     * Elimina un estudiante de la asignatura y sus calificaciones.
     * @param {Estudiante} estudiante - Estudiante a eliminar.
     */
    eliminarEstudiante(estudiante) {
        this.listaEstudiantes = this.listaEstudiantes.filter(e => e.id !== estudiante.id);
        this.calificaciones = this.calificaciones.filter(c => c.estudiante.id !== estudiante.id);
        console.log(`Estudiante ${estudiante.nombre} eliminado de la asignatura ${this.nombre}.`);
    }

    /**
     * Devuelve la representación en cadena de la asignatura.
     * @returns {string} Representación en cadena de la asignatura.
     */
    toString() {
        return `Asignatura: ${this.nombre}, Estudiantes matriculados: ${this.listaEstudiantes.length}`;
    }
}