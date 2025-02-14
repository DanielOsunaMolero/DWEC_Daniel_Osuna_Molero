/*
Enlace a GitHub

https://github.com/DanielOsunaMolero/DWEC_Daniel_Osuna_Molero/blob/main/Proyecto_SGAEA/Proyecto_Daniel_Osuna_Molero_1%C2%BATrimestre/Proyecto.js


/**
     Clase Direccion
    Representa la dirección de un estudiante.

    Atributos:
    _calle: (Cadena) Nombre de la calle.
    _numero: (Número) Número de la dirección.
    _piso: (Cadena) Piso o apartamento.
    _codPostal: (Cadena) Código postal (5 dígitos).
    _provincia: (Cadena) Provincia de la dirección.
    _localidad: (Cadena) Localidad de la dirección.
    Métodos:
    1.constructor(calle, numero, piso, codPostal, provincia, localidad) Inicializa una nueva dirección con los datos proporcionados.

    2.Getters (calle, numero, piso, codPostal, provincia, localidad) Devuelven los valores correspondientes de la dirección.
 */

    
    class Direccion {
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
    
        toString() {
            return `${this._calle}, ${this._numero}, ${this._piso}, ${this._localidad}, ${this._provincia} (${this._codPostal})`;
        }
    }
    
    
    
/*
    Clase Persona 
    es una clase base que encapsula los atributos y comportamientos comunes de cualquier persona, como su nombre, edad y dirección. 
    Está diseñada para ser reutilizada por otras clases que representan tipos específicos de personas, como Estudiante o en un futuro se podrian añadir profesores.

    Atributos:
    _nombre (string):
    Almacena el nombre de la persona. Es un atributo privado y solo se puede acceder o modificar a través de los métodos públicos.

    _edad (number):
    Representa la edad de la persona. Es un atributo privado y solo se puede acceder o modificar a través de los métodos públicos.

    _direccion (Direccion):
    Representa la dirección de la persona. Debe ser una instancia de la clase Direccion. Es un atributo privado.

 */

    class Persona {
        #id;
    
        constructor(id, nombre, edad, direccion) {
            this.#id = id;
            this._nombre = nombre;
            this._edad = edad;
            this._direccion = direccion;
        }
    
        get id() {
            return this.#id;
        }
    
        get nombre() {
            return this._nombre;
        }
    
        toString() {
            return `ID: ${this.#id}, Nombre: ${this.nombre}, Edad: ${this._edad}, Dirección: ${this._direccion}`;
        }
    }

    
    

/*
    Clase Estudiante
    La clase Estudiante representa a un estudiante que hereda de la clase base Persona.
    Representa un estudiante con sus datos personales, asignaturas  y funcionalidades.

    Atributos:
    _id (number):
    Identificador único del estudiante. Es un atributo privado.

    _asignaturas (Array):
    Lista de asignaturas en las que el estudiante está matriculado. Cada elemento del array es un objeto que contiene:

    1.asignatura (Asignatura): Una instancia de la clase Asignatura.
    2.fechaMatricula (string): Fecha en formato DD/MM/AAAA que indica cuándo el estudiante se matriculó en la asignatura.

    Métodos:

    1.constructor(id, nombre, edad, direccion) Inicializa un nuevo estudiante con los datos proporcionados.

    2.get id() Devuelve el ID del estudiante.

    3.get nombre() Devuelve el nombre del estudiante.

    4.get edad() Devuelve la edad del estudiante.

    5.get direccion() Devuelve la dirección del estudiante.

    6.get asignaturas() Devuelve una copia de la lista de asignaturas matriculadas.

    7.toString() Devuelve una representación en forma de cadena del estudiante.

    8.matricular(asignatura) Matricula al estudiante en una asignatura, almacenando la fecha de matrícula.

    9.desmatricular(asignatura) Elimina la asignatura de la lista de asignaturas del estudiante y actualiza la lista de la asignatura.

    10.promedioIndividual() Calcula el promedio general de todas las asignaturas en las que el estudiante está matriculado.
*/

class Estudiante extends Persona {
    #asignaturas;

    constructor(id, nombre, edad, direccion) {
        super(id, nombre, edad, direccion);
        this.#asignaturas = [];
    }

    get asignaturas() {
        return [...this.#asignaturas];
    }

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

    mostrarAsignaturas() {
        console.log(`Asignaturas de ${this.nombre}:`);
        this.#asignaturas.forEach(a => console.log(`- ${a.asignatura.nombre}`));
    }

    toString() {
        return `${super.toString()}, ${this.#asignaturas.length > 0 ? `Asignaturas matriculadas: ${this.#asignaturas.length}` : "No tiene asignaturas matriculadas."}`;
    }
}



/**
    Clase Asignatura
    Representa una asignatura que contiene estudiantes matriculados y sus calificaciones.

    Atributos:
    -nombre: (Cadena) Nombre de la asignatura.
    -listaEstudiantes: (Array) Lista de estudiantes matriculados en la asignatura.
    -calificaciones: (Array) Lista de objetos { estudiante, calificaciones } que almacenan las calificaciones de cada estudiante.

    Métodos:
    1.constructor(nombre) Inicializa una nueva asignatura con el nombre proporcionado.

    2.agregarEstudiante(estudiante) Añade un estudiante a la lista de la asignatura e inicializa su registro de calificaciones.

    3.eliminarEstudiante(estudiante) Elimina un estudiante de la lista de la asignatura y su registro de calificaciones. //corregido y borrado por que no tiene sentido

    4.asignarNota(estudiante, nota) Añade una calificación al estudiante en esta asignatura.

    5.obtenerNotas(estudiante) Devuelve la lista de calificaciones del estudiante en esta asignatura.

    6.promedio(estudiante) Calcula el promedio de las calificaciones del estudiante en esta asignatura.

    7.toString() Devuelve una representación en forma de cadena de la asignatura con el número de estudiantes matriculados.
 */
    class Asignatura {
        constructor(nombre) {
            this.nombre = nombre;
            this.listaEstudiantes = [];
            this.calificaciones = [];
        }
    
        // Método para agregar un estudiante a la asignatura e inicializar su registro de calificaciones
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
        
    
        obtenerNotas(estudiante) {
            const registro = this.calificaciones.find(c => c.estudiante.id === estudiante.id);
            return registro ? registro.calificaciones : [];
        }
    
        calcularPromedio() {
            const todasLasNotas = this.calificaciones.flatMap(c => c.calificaciones);
            return todasLasNotas.length
                ? (todasLasNotas.reduce((sum, val) => sum + val, 0) / todasLasNotas.length).toFixed(2)
                : "No hay calificaciones disponibles.";
        }
    
        mostrarEstudiantes() {
            console.log(`Estudiantes matriculados en ${this.nombre}:`);
            this.listaEstudiantes.forEach(est => console.log(`- ${est.nombre}`));
        }

        eliminarEstudiante(estudiante) {
            this.listaEstudiantes = this.listaEstudiantes.filter(e => e.id !== estudiante.id);
            this.calificaciones = this.calificaciones.filter(c => c.estudiante.id !== estudiante.id);
            console.log(`Estudiante ${estudiante.nombre} eliminado de la asignatura ${this.nombre}.`);
        }
    
        toString() {
            return `Asignatura: ${this.nombre}, Estudiantes matriculados: ${this.listaEstudiantes.length}`;
        }
    }
    
    

/**
    Clase ListaEstudiantes
    Administra una lista de estudiantes, permitiendo su gestión global.

    Atributos:
    listaEstudiantes: (Objeto) Diccionario de estudiantes con el ID como clave.
    idActual: (Número) ID único incremental para nuevos estudiantes.
    Métodos:
    1.constructor() Inicializa la lista de estudiantes y el contador de IDs.

    2.agregarEstudiante(nombre, edad, direccion) Añade un nuevo estudiante a la lista.

    3.eliminarEstudiante(id) Elimina un estudiante de la lista por su ID.

    4.obtenerEstudiantePorID(id) Devuelve un estudiante con el ID especificado.

    5.generarReporte() Genera un reporte detallado de todos los estudiantes y sus asignaturas matriculadas.

    6.promedioGeneral() Calcula el promedio general de calificaciones de todos los estudiantes.
 */
    class ListaEstudiantes {
        constructor() {
            this.listaEstudiantes = {};
            this.idActual = 1;
        }
    
        agregarEstudiante(nombre, edad, direccion) {
            const nuevoEstudiante = new Estudiante(this.idActual, nombre, edad, direccion);
            this.listaEstudiantes[this.idActual] = nuevoEstudiante;
            console.log(`Estudiante ${nombre} añadido con éxito.`);
            this.idActual++;
        }
    
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

        buscarAsignaturaPorNombre(nombreAsignatura, asignaturasDisponibles) {
            const asignatura = asignaturasDisponibles.find(a => a.nombre === nombreAsignatura);
            if (!asignatura) {
                throw new Error(`Asignatura '${nombreAsignatura}' no encontrada.`);
            }
            return asignatura;
        }
    
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
    
    

/**
 * Menú
 * Interfaz principal para interactuar con el sistema.
 *
 * Opciones:
 * 1. Añadir estudiante.
 * 2. Eliminar estudiante.
 * 3. Mostrar estudiantes.
 * 4. Añadir asignatura.
 * 5. Mostrar asignaturas.
 * 6. Matricular estudiante en asignatura.
 * 7. Desmatricular estudiante de asignatura.
 * 8. Asignar nota a un estudiante.
 * 9. Calcular promedio de un estudiante.
 * 10. Calcular promedio general de estudiantes.
 * 0. Salir.
 */

///////////////////////////////////PRUEBAS///////////////////////////////////////


// Agregar estudiantes
const PlistaEstudiantes = new ListaEstudiantes();

// Crear asignaturas
const asignaturas = [];

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

    estudiante1.matricular("Matemáticas", PlistaEstudiantes, asignaturas);
    estudiante1.matricular("Física", PlistaEstudiantes, asignaturas);
    estudiante2.matricular("Matemáticas", PlistaEstudiantes, asignaturas);
    estudiante2.matricular("Literatura", PlistaEstudiantes, asignaturas);
    estudiante3.matricular("Física", PlistaEstudiantes, asignaturas);
    estudiante3.matricular("Literatura", PlistaEstudiantes, asignaturas);


    // Asignar notas a cada estudiante en sus asignaturas
    matematicas.asignarNota("Daniel", 8, PlistaEstudiantes);
    matematicas.asignarNota("Ana", 9, PlistaEstudiantes);
    fisica.asignarNota("Daniel", 7, PlistaEstudiantes);
    fisica.asignarNota("Carlos", 6, PlistaEstudiantes);
    literatura.asignarNota("Ana", 9, PlistaEstudiantes);
    literatura.asignarNota("Carlos", 7, PlistaEstudiantes);


    console.log("Datos inicializados correctamente.");
    console.log("-----------------------------------------------------------");
}

inicializarDatosPrueba();



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
            case "1": // Añadir estudiante

                // Solicitar datos del estudiante
                const nombre = prompt("Nombre del estudiante:");
                const edad = parseInt(prompt("Edad del estudiante:"), 10);
                const direccion = prompt("Dirección del estudiante:");
                 // Añadir estudiante a la lista
                PlistaEstudiantes.agregarEstudiante(nombre, edad, direccion);
                
                
                break;

            case "2": //Eliminar estudiante
                //Solicitamos el ID del estudiante
                const idEliminar = parseInt(prompt("ID del estudiante a eliminar:"), 10);
                PlistaEstudiantes.eliminarEstudiante(idEliminar);
                break;

            case "3":
                PlistaEstudiantes.mostrarEstudiantes();
                break;

            case "4": // Añadir asignatura
                const nombreAsignatura = prompt("Nombre de la asignatura:");
                asignaturas.push(new Asignatura(nombreAsignatura));
                console.log(`Asignatura ${nombreAsignatura} añadida con éxito.`);
                
                break;

            case "5": // Mostrar asignaturas
                console.log("Lista de asignaturas:");
                asignaturas.forEach(a => console.log(`Asignatura: ${a.nombre}, Estudiantes matriculados: ${a.listaEstudiantes.length}`));
                
                break;

            case "6":
                
                const nombreEstudiante = prompt("Introduce el nombre del estudiante");
                const estudianteMatricular = PlistaEstudiantes.buscarEstudiantePorNombre(nombreEstudiante);
                
                const nombreAsignaturaMat = prompt("Introduce el nombre de la asignatura");
                
                estudianteMatricular.matricular(nombreAsignaturaMat, PlistaEstudiantes, asignaturas);
                
                break;
                

            case "7":
                const nombreEstudianteDes = prompt("Introduce el nombre del estudiante que desea desmatricular:");
                const estudianteDesmatricular = PlistaEstudiantes.buscarEstudiantePorNombre(nombreEstudianteDes);
            
                const nombreAsignaturaDes = prompt("Introduce el nombre de la asignatura de la que se desea desmatricular al estudiante:");
                
                estudianteDesmatricular.desmatricular(nombreAsignaturaDes, PlistaEstudiantes, asignaturas);
                
                break;
                    

            case "8":
                const nombreEstNota = prompt("Nombre del estudiante:");
                const nombreAsigNota = prompt("Nombre de la asignatura:");
                const nota = parseFloat(prompt("Introduce la nota (0-10):"));
            
                // Buscar la asignatura usando el método en ListaEstudiantes
                const asignatura = PlistaEstudiantes.buscarAsignaturaPorNombre(nombreAsigNota, asignaturas);
            
                // Asignar la nota
                asignatura.asignarNota(nombreEstNota, nota, PlistaEstudiantes);
                break;
                

            case "9": // Calcular promedio de un estudiante
                
                //Pedimos datos necesarios
                const idEstPromedio = parseInt(prompt("ID del estudiante:"), 10);
                const estudiantePromedio = PlistaEstudiantes.listaEstudiantes[idEstPromedio];


                //Calculamos el promedio del estudiante
                const mediaEst = estudiantePromedio.promedioIndividual();
                console.log(`El promedio de ${estudiantePromedio.nombre} es: ${mediaEst}`);
                break;

            case "10": // Calcular promedio general de estudiantes
                const promedioGeneral = PlistaEstudiantes.promedioGeneral();
                console.log(`Promedio general de todos los estudiantes: ${promedioGeneral}`);
                break;

            case "0": // Salir
                console.log("Saliendo del programa...");
                continuar = false;
                break;

            default: // Opción no válida
                console.log("Opción no válida. Por favor, introduce un número entre 0 y 10.");
        }
    }
}

// Ejecutar el programa
programa();
