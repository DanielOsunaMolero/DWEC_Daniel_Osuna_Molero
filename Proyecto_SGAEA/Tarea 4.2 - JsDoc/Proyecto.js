/*
 * Enlace a GitHub
 * https://github.com/DanielOsunaMolero/DWEC_OsunaMolero_Daniel/blob/ramal/Proyecto%20primer%20trimestre%20Daniel%20Osuna/Proyecto.js
 */

/**
 * Clase Direccion
 * Representa la dirección de un estudiante.
 */
class Direccion {
    /**
     * Crea una nueva dirección.
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
     * Convierte la dirección a una representación en forma de cadena.
     * @returns {string} La dirección en formato legible.
     */
    toString() {
        return `${this._calle}, ${this._numero}, ${this._piso}, ${this._localidad}, ${this._provincia} (${this._codPostal})`;
    }
}

/**
 * Clase Persona
 * Representa a una persona con atributos comunes como nombre, edad y dirección.
 */
class Persona {
    /**
     * Crea una nueva Persona.
     * @param {string} nombre - Nombre de la persona.
     * @param {number} edad - Edad de la persona.
     * @param {Direccion} direccion - Dirección de la persona.
     */
    constructor(nombre, edad, direccion) {
        this._nombre = nombre;
        this._edad = edad;
        this._direccion = direccion;
    }

    /**
     * Convierte el objeto Persona a una representación en forma de cadena.
     * @returns {string} La representación textual de la Persona.
     */
    toString() {
        return `Nombre: ${this._nombre}, Edad: ${this._edad}, Dirección: ${this._direccion}`;
    }
}

/**
 * Clase Estudiante
 * Representa a un estudiante que hereda de la clase Persona.
 */
class Estudiante extends Persona {
    /**
     * Crea un nuevo Estudiante.
     * @param {number} id - ID único del estudiante.
     * @param {string} nombre - Nombre del estudiante.
     * @param {number} edad - Edad del estudiante.
     * @param {Direccion} direccion - Dirección del estudiante.
     */
    constructor(id, nombre, edad, direccion) {
        super(nombre, edad, direccion);
        this._id = id;
        this._asignaturas = [];
    }

    /**
     * Matricula al estudiante en una asignatura.
     * @param {Asignatura} asignatura - La asignatura en la que se matricula.
     */
    matricular(asignatura) {
        this._asignaturas.push({ asignatura, fechaMatricula: new Date().toLocaleDateString("es-ES") });
        asignatura.agregarEstudiante(this);
    }

    /**
     * Desmatricula al estudiante de una asignatura.
     * @param {Asignatura} asignatura - La asignatura de la que se desmatricula.
     * @throws {Error} Si el estudiante no está matriculado en la asignatura.
     */
    desmatricular(asignatura) {
        try {
            const index = this._asignaturas.findIndex(a => a.asignatura === asignatura);
            if (index === -1) throw new Error("El estudiante no está matriculado en esta asignatura.");
            this._asignaturas.splice(index, 1);
            asignatura.listaEstudiantes = asignatura.listaEstudiantes.filter(est => est !== this);
        } catch (error) {
            console.error("Error al desmatricular", error.message);
        }
    }

    /**
     * Calcula el promedio de todas las asignaturas del estudiante.
     * @returns {string} El promedio del estudiante o un mensaje si no hay calificaciones disponibles.
     */
    promedioIndividual() {
        const notas = this._asignaturas.flatMap(a => a.asignatura.obtenerNotas(this));
        return notas.length ? (notas.reduce((sum, val) => sum + val, 0) / notas.length).toFixed(2) : "No hay calificaciones disponibles.";
    }

    /**
     * Muestra todas las asignaturas en las que el estudiante está matriculado.
     */
    mostrarAsignaturas() {
        console.log(`Asignaturas de ${this._nombre}:`);
        this._asignaturas.forEach(a => console.log(`- ${a.asignatura.nombre}`));
    }

    /**
     * Convierte el objeto Estudiante a una representación en forma de cadena.
     * @returns {string} La representación textual del Estudiante.
     */
    toString() {
        return `ID: ${this._id}, ${super.toString()}`;
    }
}

/**
 * Clase Asignatura
 * Representa una asignatura que contiene estudiantes matriculados y sus calificaciones.
 */
class Asignatura {
    /**
     * Crea una nueva Asignatura.
     * @param {string} nombre - Nombre de la asignatura.
     */
    constructor(nombre) {
        this.nombre = nombre;
        this.listaEstudiantes = [];
        this.calificaciones = [];
    }

    /**
     * Añade un estudiante a la asignatura.
     * @param {Estudiante} estudiante - El estudiante que se matricula.
     */
    agregarEstudiante(estudiante) {
        this.listaEstudiantes.push(estudiante);
        if (!this.calificaciones.some(c => c.estudiante === estudiante)) {
            this.calificaciones.push({ estudiante, calificaciones: [] });
        }
    }

    /**
     * Asigna una calificación a un estudiante.
     * @param {Estudiante} estudiante - El estudiante que recibe la nota.
     * @param {number} nota - La calificación asignada.
     * @throws {Error} Si la nota no está entre 0 y 10.
     */
    asignarNota(estudiante, nota) {
        if (nota < 0 || nota > 10) throw new Error("Nota inválida.");
        const registro = this.calificaciones.find(c => c.estudiante === estudiante);
        registro.calificaciones.push(nota);
    }

    /**
     * Obtiene las calificaciones de un estudiante.
     * @param {Estudiante} estudiante - El estudiante cuyas notas se obtienen.
     * @returns {number[]} Las calificaciones del estudiante.
     */
    obtenerNotas(estudiante) {
        const registro = this.calificaciones.find(c => c.estudiante === estudiante);
        return registro ? registro.calificaciones : [];
    }

    /**
     * Calcula el promedio de la asignatura.
     * @returns {string} El promedio de las calificaciones o un mensaje si no hay notas disponibles.
     */
    calcularPromedio() {
        const todasLasNotas = this.calificaciones.flatMap(c => c.calificaciones);
        return todasLasNotas.length
            ? (todasLasNotas.reduce((sum, val) => sum + val, 0) / todasLasNotas.length).toFixed(2)
            : "No hay calificaciones disponibles.";
    }

    /**
     * Muestra los estudiantes matriculados en la asignatura.
     */
    mostrarEstudiantes() {
        console.log(`Estudiantes matriculados en ${this.nombre}:`);
        this.listaEstudiantes.forEach(est => console.log(`- ${est.nombre}`));
    }

    /**
     * Convierte el objeto Asignatura a una representación en forma de cadena.
     * @returns {string} La representación textual de la asignatura.
     */
    toString() {
        return `Asignatura: ${this.nombre}, Estudiantes matriculados: ${this.listaEstudiantes.length}`;
    }
}

/**
 * Clase ListaEstudiantes
 * Administra una lista de estudiantes, permitiendo su gestión global.
 */
class ListaEstudiantes {
    /**
     * Crea una nueva lista de estudiantes.
     */
    constructor() {
        this.listaEstudiantes = {};
        this.idActual = 1;
    }

    /**
     * Añade un nuevo estudiante a la lista.
     * @param {string} nombre - Nombre del estudiante.
     * @param {number} edad - Edad del estudiante.
     * @param {Direccion} direccion - Dirección del estudiante.
     */
    agregarEstudiante(nombre, edad, direccion) {
        const nuevoEstudiante = new Estudiante(this.idActual, nombre, edad, direccion);
        this.listaEstudiantes[this.idActual] = nuevoEstudiante;
        this.idActual++;
        console.log(`Estudiante ${nombre} añadido con éxito.`);
    }

    /**
     * Elimina un estudiante por su ID.
     * @param {number} id - El ID del estudiante a eliminar.
     */
    eliminarEstudiante(id) {
        const estudiante = this.listaEstudiantes[id];
        if (!estudiante) {
            console.log(`No se encontró un estudiante con ID ${id}.`);
            return;
        }

        // Desmatricular al estudiante de todas las asignaturas
        estudiante._asignaturas.forEach(a => {
            a.asignatura.listaEstudiantes = a.asignatura.listaEstudiantes.filter(est => est !== estudiante);
        });

        // Eliminar al estudiante de la lista
        delete this.listaEstudiantes[id];
        console.log(`Estudiante con ID ${id} eliminado y desmatriculado de todas las asignaturas.`);
    }

    /**
     * Muestra todos los estudiantes en la lista.
     */
    mostrarEstudiantes() {
        for (const id in this.listaEstudiantes) {
            console.log(this.listaEstudiantes[id].toString());
        }
    }

    /**
     * Calcula el promedio general de todos los estudiantes.
     */
    calcularPromedioGeneral() {
        let suma = 0, cantidad = 0;
        for (const id in this.listaEstudiantes) {
            const promedio = parseFloat(this.listaEstudiantes[id].promedioIndividual());
            if (!isNaN(promedio)) {
                suma += promedio;
                cantidad++;
            }
        }
        console.log(`Promedio general de todos los estudiantes: ${(cantidad ? suma / cantidad : 0).toFixed(2)}`);
    }

    /**
     * Busca estudiantes cuyo nombre coincida con un patrón.
     * @param {string} patron - El patrón a buscar.
     */
    buscarEstudiantePorNombre(patron) {
        const resultados = Object.values(this.listaEstudiantes).filter(est =>
            est.nombre.toLowerCase().includes(patron.toLowerCase())
        );
        if (resultados.length === 0) {
            console.log("No se encontraron estudiantes.");
        } else {
            resultados.forEach(est => console.log(est.toString()));
        }
    }
}


// Agregar estudiantes
const PlistaEstudiantes = new ListaEstudiantes();

// Crear asignaturas
const asignaturas = [];

/**
 * Inicializa datos de ejemplo para el programa.
 */
function inicializarDatos() {
    const direccion1 = new Direccion("Calle Primavera", 15, "2A", "28010", "Madrid", "Madrid");
    const direccion2 = new Direccion("Calle Invierno", 22, "3B", "18012", "Granada", "Granada");
    const direccion3 = new Direccion("Calle Verano", 5, "1C", "41013", "Sevilla", "Sevilla");

    // Agregar estudiantes
    PlistaEstudiantes.agregarEstudiante("Juan Pérez", 20, direccion1);
    PlistaEstudiantes.agregarEstudiante("Ana López", 22, direccion2);
    PlistaEstudiantes.agregarEstudiante("Carlos García", 21, direccion3);

    // Crear asignaturas
    const matematicas = new Asignatura("Matemáticas");
    const fisica = new Asignatura("Física");
    const literatura = new Asignatura("Literatura");

    asignaturas.push(matematicas, fisica, literatura);

    // Matricular estudiantes en asignaturas
    const estudiante1 = PlistaEstudiantes.listaEstudiantes[1];
    const estudiante2 = PlistaEstudiantes.listaEstudiantes[2];
    const estudiante3 = PlistaEstudiantes.listaEstudiantes[3];

    estudiante1.matricular(matematicas);
    estudiante1.matricular(fisica);

    estudiante2.matricular(matematicas);
    estudiante2.matricular(literatura);

    estudiante3.matricular(fisica);
    estudiante3.matricular(literatura);

    // Asignar notas
    matematicas.asignarNota(estudiante1, 8.5);
    matematicas.asignarNota(estudiante2, 9.0);

    fisica.asignarNota(estudiante1, 7.5);
    fisica.asignarNota(estudiante3, 8.0);

    literatura.asignarNota(estudiante2, 9.5);
    literatura.asignarNota(estudiante3, 8.5);

    console.log("Datos inicializados correctamente.");
}

inicializarDatos();

/**
 * Muestra el menú principal e interactúa con el usuario.
 */
function programa() {
    /**
     * Muestra las opciones disponibles en el menú principal.
     */
    function mostrarMenu() {
        console.log(`
        === Menú Principal ===
        1. Añadir estudiante
        2. Eliminar estudiante
        3. Mostrar estudiantes
        4. Añadir asignatura
        5. Mostrar asignaturas
        6. Matricular estudiante en asignatura
        7. Desmatricular estudiante de asignatura
        8. Asignar nota a un estudiante
        9. Calcular promedio de un estudiante
        10. Calcular promedio general de estudiantes
        0. Salir
        Escribe tu opción en la consola y presiona Enter:
        `);
    }

    /**
     * Procesa la opción seleccionada por el usuario.
     * @param {string} opcion - La opción seleccionada del menú.
     * @returns {boolean} Indica si el programa debe continuar ejecutándose.
     */
    function procesarOpcion(opcion) {
        switch (opcion) {
            case "1":
                /**
                 * Solicita información del estudiante y lo agrega a la lista.
                 */
                const nombre = prompt("Nombre del estudiante:");
                const edad = parseInt(prompt("Edad del estudiante:"), 10);
                const direccion = prompt("Dirección del estudiante:");
                PlistaEstudiantes.agregarEstudiante(nombre, edad, direccion);
                console.log(`Estudiante ${nombre} añadido con éxito.`);
                break;

            case "2":
                /**
                 * Elimina un estudiante por su ID.
                 */
                try {
                    const idEliminar = parseInt(prompt("ID del estudiante a eliminar:"), 10);
                    if (isNaN(idEliminar)) throw new Error("ID inválido. Por favor, introduce un número válido.");
                    PlistaEstudiantes.eliminarEstudiante(idEliminar);
                } catch (error) {
                    console.error("Error al eliminar estudiante:", error.message);
                }
                break;

            case "3":
                /**
                 * Muestra la lista de estudiantes.
                 */
                console.log("Lista de estudiantes:");
                PlistaEstudiantes.mostrarEstudiantes();
                break;

            case "4":
                /**
                 * Agrega una nueva asignatura.
                 */
                const nombreAsignatura = prompt("Nombre de la asignatura:");
                asignaturas.push(new Asignatura(nombreAsignatura));
                console.log(`Asignatura ${nombreAsignatura} añadida con éxito.`);
                break;

            case "5":
                /**
                 * Muestra la lista de asignaturas y sus estudiantes matriculados.
                 */
                console.log("Lista de asignaturas:");
                asignaturas.forEach(a => console.log(`Asignatura: ${a.nombre}, Estudiantes matriculados: ${a.listaEstudiantes.length}`));
                break;

            case "6":
                /**
                 * Matricula a un estudiante en una asignatura.
                 */
                const idEstMatricular = parseInt(prompt("ID del estudiante a matricular:"), 10);
                const nombreAsigMatricular = prompt("Nombre de la asignatura:");
                const estudianteMatricular = PlistaEstudiantes.listaEstudiantes[idEstMatricular];
                const asignaturaMatricular = asignaturas.find(a => a.nombre === nombreAsigMatricular);
                if (estudianteMatricular && asignaturaMatricular) {
                    estudianteMatricular.matricular(asignaturaMatricular);
                    console.log(`Estudiante ${estudianteMatricular._nombre} matriculado en ${asignaturaMatricular.nombre}.`);
                } else {
                    console.log("Estudiante o asignatura no encontrados.");
                }
                break;

            case "7":
                /**
                 * Desmatricula a un estudiante de una asignatura.
                 */
                const idEstDesmatricular = parseInt(prompt("ID del estudiante a desmatricular:"), 10);
                const nombreAsigDesmatricular = prompt("Nombre de la asignatura:");
                const estudianteDesmatricular = PlistaEstudiantes.listaEstudiantes[idEstDesmatricular];
                const asignaturaDesmatricular = asignaturas.find(a => a.nombre === nombreAsigDesmatricular);
                if (estudianteDesmatricular && asignaturaDesmatricular) {
                    estudianteDesmatricular.desmatricular(asignaturaDesmatricular);
                    console.log(`Estudiante ${estudianteDesmatricular._nombre} desmatriculado de ${asignaturaDesmatricular.nombre}.`);
                } else {
                    console.log("Estudiante o asignatura no encontrados.");
                }
                break;

            case "8":
                /**
                 * Asigna una nota a un estudiante en una asignatura.
                 */
                const idEstNota = parseInt(prompt("ID del estudiante:"), 10);
                const nombreAsigNota = prompt("Nombre de la asignatura:");
                const nota = parseFloat(prompt("Introduce la nota (0-10):"));
                const estudianteNota = PlistaEstudiantes.listaEstudiantes[idEstNota];
                const asignaturaNota = asignaturas.find(a => a.nombre === nombreAsigNota);
                if (estudianteNota && asignaturaNota) {
                    asignaturaNota.asignarNota(estudianteNota, nota);
                    console.log(`Nota ${nota} asignada a ${estudianteNota._nombre} en ${asignaturaNota.nombre}.`);
                } else {
                    console.log("Estudiante o asignatura no encontrados.");
                }
                break;

            case "9":
                /**
                 * Calcula el promedio de un estudiante.
                 */
                try {
                    const idEstPromedio = parseInt(prompt("ID del estudiante:"), 10);
                    const estudiantePromedio = PlistaEstudiantes.listaEstudiantes[idEstPromedio];
                    if (!estudiantePromedio) throw new Error("Estudiante no encontrado.");
                    if (estudiantePromedio._asignaturas.length === 0) throw new Error("El estudiante no tiene asignaturas matriculadas.");
                    const promedio = estudiantePromedio.promedioIndividual();
                    console.log(`Promedio de ${estudiantePromedio._nombre}: ${promedio}`);
                } catch (error) {
                    console.error("Error al calcular promedio:", error.message);
                }
                break;

            case "10":
                /**
                 * Calcula el promedio general de todos los estudiantes.
                 */
                let sumaPromedios = 0;
                let totalEstudiantes = 0;
                for (const id in PlistaEstudiantes.listaEstudiantes) {
                    const estudiante = PlistaEstudiantes.listaEstudiantes[id];
                    const promedio = parseFloat(estudiante.promedioIndividual());
                    if (!isNaN(promedio)) {
                        sumaPromedios += promedio;
                        totalEstudiantes++;
                    }
                }
                const promedioGeneral = totalEstudiantes ? (sumaPromedios / totalEstudiantes).toFixed(2) : 0;
                console.log(`Promedio general de todos los estudiantes: ${promedioGeneral}`);
                break;

            case "0":
                /**
                 * Finaliza el programa.
                 */
                console.log("Saliendo del programa...");
                return false;

            default:
                /**
                 * Maneja opciones no válidas.
                 */
                console.log("Opción no válida. Por favor, introduce un número entre 0 y 10.");
        }
        return true;
    }

    let continuar = true;
    while (continuar) {
        mostrarMenu();
        const opcion = prompt("Introduce una opción:");
        continuar = procesarOpcion(opcion);
    }
}

// Ejecutar el programa
programa();


