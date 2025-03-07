/**
 * Clase que representa una persona.
 * @class
 */
export class Persona {
    /**
     * Crea una instancia de Persona.
     * @param {number} id - Identificador único de la persona.
     * @param {string} nombre - Nombre de la persona.
     * @param {number} edad - Edad de la persona.
     * @param {Direccion} direccion - Dirección de la persona.
     */

    #id;

    constructor(id, nombre, edad, direccion) {
        this.#id = id;
        this._nombre = nombre;
        this._edad = edad;
        this._direccion = direccion;
    }

    /**
     * Obtiene el ID de la persona.
     * @returns {number} ID de la persona.
     */
    get id() {
        return this.#id;
    }

    /**
     * Obtiene el nombre de la persona.
     * @returns {string} Nombre de la persona.
     */
    get nombre() {
        return this._nombre;
    }

    /**
     * Devuelve la representación en cadena de la persona.
     * @returns {string} Representación en cadena de la persona.
     */
    toString() {
        return `ID: ${this.#id}, Nombre: ${this.nombre}, Edad: ${this._edad}, Dirección: ${this._direccion}`;
    }
}
