/**
 * Clase que representa una dirección.
 * @class
 */
export class Direccion {
    /**
 * Crea una instancia de Direccion.
 * @param {string} calle - Nombre de la calle.
 * @param {number} numero - Número de la dirección.
 * @param {string} piso - Piso o apartamento.
 * @param {string} codPostal - Código postal (5 dígitos).
 * @param {string} provincia - Provincia de la dirección.
 * @param {string} localidad - Localidad de la dirección.
 * @throws {Error} Si el código postal no tiene exactamente 5 dígitos.
 */
    constructor(calle, numero, piso, codPostal, provincia, localidad) {
        this._calle = calle;
        this._numero = numero;
        this._piso = piso;

        if (!/^\d{5}$/.test(codPostal)) {
            throw new Error("El código postal debe tener exactamente 5 dígitos.");
        }
        this._codPostal = codPostal;
        this._provincia = provincia;
        this._localidad = localidad;
    }

    /**
     * Devuelve la representación en cadena de la dirección.
     * @returns {string} Representación en cadena de la dirección.
     */
    toString() {
        return `${this._calle}, ${this._numero}, ${this._piso}, ${this._localidad}, ${this._provincia} (${this._codPostal})`;
    }
}