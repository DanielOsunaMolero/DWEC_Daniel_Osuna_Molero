/*
Enlace a GitHub

https://github.com/DanielOsunaMolero/DWEC_Daniel_Osuna_Molero/blob/main/Proyecto_SGAEA/Proyecto_Daniel_Osuna_Molero_1%C2%BATrimestre/Proyecto.js


/**
 * Clase que representa una dirección.
 * @class
 */
class Direccion {
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




/**
 * Clase que representa una persona.
 * @class
 */
class Persona {
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

    
    

/**
 * Clase que representa a un estudiante.
 * @extends Persona
 * @class
 */
class Estudiante extends Persona {

    #asignaturas;

    /**
     * Crea una instancia de Estudiante.
     * @param {number} id - Identificador único del estudiante.
     * @param {string} nombre - Nombre del estudiante.
     * @param {number} edad - Edad del estudiante.
     * @param {Direccion} direccion - Dirección del estudiante.
     */
    constructor(id, nombre, edad, direccion) {
        super(id, nombre, edad, direccion);
        this.#asignaturas = [];
    }

    /**
     * Obtiene las asignaturas en las que el estudiante está matriculado.
     * @returns {Array} Lista de asignaturas.
     */
    get asignaturas() {
        return [...this.#asignaturas];
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

            if (!this.#asignaturas.some(a => a.asignatura === asignatura)) {
                this.#asignaturas.push({ asignatura, fechaMatricula: new Date().toLocaleDateString("es-ES") });
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

            const index = this.#asignaturas.findIndex(a => a.asignatura === asignatura);

            if (index !== -1) {
                this.#asignaturas.splice(index, 1);
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
            if (this.#asignaturas.length === 0) throw new Error("El estudiante no tiene asignaturas matriculadas.");
            const notas = this.#asignaturas.flatMap(a => a.asignatura.obtenerNotas(this));
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
        this.#asignaturas.forEach(a => console.log(`- ${a.asignatura.nombre}`));
    }

    /**
     * Devuelve la representación en cadena del estudiante.
     * @returns {string} Representación en cadena del estudiante.
     */
    toString() {
        return `${super.toString()}, ${this.#asignaturas.length > 0 ? `Asignaturas matriculadas: ${this.#asignaturas.length}` : "No tiene asignaturas matriculadas."}`;
    }
}


/**
 * Clase que representa una asignatura.
 * @class
 */
class Asignatura {
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
     * @param {string} nombreEstudiante - Nombre del estudiante al que asignar la nota.
     * @param {number} nota - Nota a asignar (valor entre 0 y 10).
     * @param {ListaEstudiantes} listaEstudiantesObj - Objeto que gestiona la lista de estudiantes.
     * @throws {Error} Si el estudiante no está matriculado en la asignatura o la nota es inválida.
     */
    asignarNota(nombreEstudiante, nota, listaEstudiantesObj) {
        try {
            const estudiante = listaEstudiantesObj.buscarEstudiantePorNombre(nombreEstudiante);
            if (!estudiante) throw new Error(`Estudiante ${nombreEstudiante} no encontrado.`);

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
    
    

/**
 * Clase que administra una lista de estudiantes.
 * @class
 */
class ListaEstudiantes {
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
    
    
///////////////////////////////////PRUEBAS///////////////////////////////////////


// Agregar estudiantes
const PlistaEstudiantes = new ListaEstudiantes();

// Crear asignaturas
const asignaturas = [];
/**
 * Inicializa datos de prueba para la aplicación.
 */
function inicializarDatosPrueba() {

    console.log("Añadiendo datos de prueba...");
    console.log("-----------------------------------------------------------");
    const direccion1 = new Direccion("Calle Primavera", 15, "2A", "28010", "Madrid", "Madrid");
    const direccion2 = new Direccion("Calle Invierno", 22, "3B", "18012", "Granada", "Granada");
    const direccion3 = new Direccion("Calle Verano", 5, "1C", "41013", "Sevilla", "Sevilla");

    PlistaEstudiantes.agregarEstudiante("Daniel", 20, direccion1);
    PlistaEstudiantes.agregarEstudiante("Ana", 22, direccion2);
    PlistaEstudiantes.agregarEstudiante("Carlos", 21, direccion3);

    const estudiante1 = PlistaEstudiantes.listaEstudiantes[1];
    const estudiante2 = PlistaEstudiantes.listaEstudiantes[2];
    const estudiante3 = PlistaEstudiantes.listaEstudiantes[3];

    const matematicas = new Asignatura("Matemáticas");
    const fisica = new Asignatura("Física");
    const literatura = new Asignatura("Literatura");

    asignaturas.push(matematicas, fisica, literatura);

    estudiante1.matricular(matematicas);
    estudiante1.matricular(fisica);
    estudiante2.matricular(matematicas);
    estudiante2.matricular(literatura);
    estudiante3.matricular(fisica);
    estudiante3.matricular(literatura);

    // Asignar notas a cada estudiante en sus asignaturas
    matematicas.asignarNota(estudiante1, 8);
    matematicas.asignarNota(estudiante2, 9);
    fisica.asignarNota(estudiante1, 7);
    fisica.asignarNota(estudiante3, 6);
    literatura.asignarNota(estudiante2, 9);
    literatura.asignarNota(estudiante3, 7);

    console.log("Datos inicializados correctamente.");
    console.log("-----------------------------------------------------------");
}

inicializarDatosPrueba();


/**
 * Programa principal que muestra el menú y gestiona las interacciones.
 */
function programa() {
    let continuar = true;

    while (continuar) {
        // Mostrar Menú
        console.log(
            `=== Menú Principal ===\n` +
            `1. Añadir estudiante\n` +
            `2. Eliminar estudiante\n` +
            `3. Mostrar estudiantes\n` +
            `4. Añadir asignatura\n` +
            `5. Mostrar asignaturas\n` +
            `6. Matricular estudiante en asignatura\n` +
            `7. Desmatricular estudiante de asignatura\n` +
            `8. Asignar nota a un estudiante\n` +
            `9. Calcular promedio de un estudiante\n` +
            `10. Calcular promedio general de estudiantes\n` +
            `0. Salir\n` +
            `Escribe tu opción en la consola y presiona Enter: \n`+
            `-----------------------------------------------------------\n`
        );

        const opcion = prompt("Introduce una opción:");

        switch (opcion) {
            
            case "1": 
                 /**
                 * Añade un nuevo estudiante solicitando nombre, edad y dirección.
                 */
                const nombre = prompt("Nombre del estudiante:");
                const edad = parseInt(prompt("Edad del estudiante:"), 10);
                const direccion = prompt("Dirección del estudiante:");
                 
                PlistaEstudiantes.agregarEstudiante(nombre, edad, direccion);
                
                
                break;

            case "2":
                /**
                 * Elimina un estudiante de la lista solicitando su ID.
                 */
                const idEliminar = parseInt(prompt("ID del estudiante a eliminar:"), 10);
                PlistaEstudiantes.eliminarEstudiante(idEliminar);
                break;

            case "3":
                /**
                 * Muestra todos los estudiantes registrados junto con sus asignaturas.
                 */
                PlistaEstudiantes.mostrarEstudiantes();
                break;

            case "4": 
                /**
                 * Añade una nueva asignatura al sistema.
                 */
                const nombreAsignatura = prompt("Nombre de la asignatura:");
                asignaturas.push(new Asignatura(nombreAsignatura));
                console.log(`Asignatura ${nombreAsignatura} añadida con éxito.`);
                
                break;

            case "5": 
                /**
                 * Muestra todas las asignaturas disponibles y el número de estudiantes matriculados en cada una.
                 */
                console.log("Lista de asignaturas:");
                asignaturas.forEach(a => console.log(`Asignatura: ${a.nombre}, Estudiantes matriculados: ${a.listaEstudiantes.length}`));
                
                break;

            case "6": 
            /**
             * Matricula a un estudiante en una asignatura.
             * Solicita el nombre del estudiante y de la asignatura.
             */
            const nombreEstudiante = prompt("Introduce el nombre del estudiante:");
            const estudianteMatricular = PlistaEstudiantes.buscarEstudiantePorNombre(nombreEstudiante);
        
            if (estudianteMatricular) {
                const nombreAsignaturaMat = prompt("Introduce el nombre de la asignatura:");
                estudianteMatricular.matricular(nombreAsignaturaMat, PlistaEstudiantes, asignaturas);
            }
            break;
            
            case "7":
                /**
                 * Desmatricula a un estudiante de una asignatura.
                 * Solicita el nombre del estudiante y de la asignatura.
                 */
                const nombreEstudianteDes = prompt("Introduce el nombre del estudiante que desea desmatricular:");
                const estudianteDesmatricular = PlistaEstudiantes.buscarEstudiantePorNombre(nombreEstudianteDes);
            
                if (estudianteDesmatricular) {
                    const nombreAsignaturaDes = prompt("Introduce el nombre de la asignatura de la que se desea desmatricular al estudiante:");
                    estudianteDesmatricular.desmatricular(nombreAsignaturaDes, PlistaEstudiantes, asignaturas);
                }
                break;
            
            case "8":
                /**
                 * Asigna una nota a un estudiante en una asignatura específica.
                 * Solicita el nombre del estudiante, el nombre de la asignatura y la nota.
                 */
                const nombreEstNota = prompt("Nombre del estudiante:");
                const nombreAsigNota = prompt("Nombre de la asignatura:");
                const nota = parseFloat(prompt("Introduce la nota (0-10):"));
            
                const asignatura = PlistaEstudiantes.buscarAsignaturaPorNombre(nombreAsigNota, asignaturas);
                if (asignatura) {
                    asignatura.asignarNota(nombreEstNota, nota, PlistaEstudiantes);
                }
                break;
            

            case "9": 
                /**
                 * Calcula y muestra el promedio de calificaciones de un estudiante.
                 * Solicita el ID del estudiante.
                 */
                const idEstPromedio = parseInt(prompt("ID del estudiante:"), 10);
                const estudiantePromedio = PlistaEstudiantes.listaEstudiantes[idEstPromedio];


                //Calculamos el promedio del estudiante
                const mediaEst = estudiantePromedio.promedioIndividual();
                console.log(`El promedio de ${estudiantePromedio.nombre} es: ${mediaEst}`);
                break;

            case "10": 
                /**
                 * Calcula y muestra el promedio general de todos los estudiantes registrados.
                 */
                const promedioGeneral = PlistaEstudiantes.promedioGeneral();
                console.log(`Promedio general de todos los estudiantes: ${promedioGeneral}`);
                break;

            case "0": 
                /**
                 * Finaliza la ejecución del programa.
                 */
                console.log("Saliendo del programa...");
                continuar = false;
                break;

            default: 
                /**
                 * Muestra un mensaje de error si la opción ingresada no es válida.
                 */
                console.log("Opción no válida. Por favor, introduce un número entre 0 y 10.");
        }
    }
}

// Ejecutar el programa
programa();
