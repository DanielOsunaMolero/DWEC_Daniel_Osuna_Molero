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
    
        get calle() {
            return this._calle;
        }
    
        get numero() {
            return this._numero;
        }
    
        get piso() {
            return this._piso;
        }
    
        get codPostal() {
            return this._codPostal;
        }
    
        get provincia() {
            return this._provincia;
        }
    
        get localidad() {
            return this._localidad;
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
    constructor(nombre, edad, direccion) {
        this._nombre = nombre;
        this._edad = edad;
        this._direccion = direccion;
    }

    get nombre() {
        return this._nombre;
    }

    get edad() {
        return this._edad;
    }

    get direccion() {
        return this._direccion;
    }

    toString() {
        return `Nombre: ${this.nombre}, Edad: ${this.edad}, Dirección: ${this.direccion}`;
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

    asignatura (Asignatura): Una instancia de la clase Asignatura.
    fechaMatricula (string): Fecha en formato DD/MM/AAAA que indica cuándo el estudiante se matriculó en la asignatura.
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

    10.promedioGeneral() Calcula el promedio general de todas las asignaturas en las que el estudiante está matriculado.
*/

class Estudiante extends Persona {
    constructor(id, nombre, edad, direccion) {
        super(nombre, edad, direccion); // Llama al constructor de Persona
        this._id = id;
        this._asignaturas = [];
    }

    get id() {
        return this._id;
    }

    get nombre() {
        return this._nombre;
    }

    get edad() {
        return this._edad;
    }

    get direccion() {
        return this._direccion;
    }

    get asignaturas() {
        return [...this._asignaturas];
    }

    toString() {
        return `ID: ${this.id}, Nombre: ${this.nombre}, Edad: ${this.edad}, Dirección: ${this.direccion.calle}, ${this.direccion.localidad}`;
    }

    matricular(asignatura) {
        if (!(asignatura instanceof Asignatura)) {
            throw new Error("La asignatura debe ser una instancia de la clase Asignatura.");
        }

        if (this._asignaturas.includes(asignatura)) {
            throw new Error(`El estudiante ya está matriculado en ${asignatura.nombre}.`);
        }

        const fechaMatricula = new Date().toLocaleDateString("es-ES");
        this._asignaturas.push({ asignatura, fechaMatricula });
        
        asignatura.agregarEstudiante(this);
    }

    desmatricular(asignatura) {
        if (!(asignatura instanceof Asignatura)) {
            throw new Error("La asignatura debe ser una instancia de la clase Asignatura.");
        }
    
        let indice = -1; // Variable para almacenar el índice de la asignatura
    
        
        for (let i = 0; i < this._asignaturas.length; i++) {
            if (this._asignaturas[i].asignatura === asignatura) {
                indice = i;
                break;
            }
        }
    
        // Si no se encontró la asignatura, lanza un error (La bandera)
        if (indice === -1) {
            throw new Error(`El estudiante no está matriculado en ${asignatura.nombre}.`);
        }
    
        // Eliminar la asignatura de la lista
        this._asignaturas.splice(indice, 1);
        asignatura.eliminarEstudiante(this);
    
        // Imprime la fecha de desmatriculación (opcional)
        const fechaDesmatriculacion = new Date().toLocaleDateString("es-ES");
        console.log(`Desmatriculado de ${asignatura.nombre} el ${fechaDesmatriculacion}.`);
    }
    
    promedioIndividual() {
        let sumaTotalNotas = 0;
        let cantidadTotalNotas = 0;
    
        for (const asignaturaObj of this._asignaturas) {
            const asignatura = asignaturaObj.asignatura;
            const notas = asignatura.obtenerNotas(this);
    
            for (const nota of notas) {
                sumaTotalNotas += nota;
                cantidadTotalNotas++;
            }
        }
    
        if (cantidadTotalNotas === 0) {
            return "No hay calificaciones disponibles.";
        }
    
        return (sumaTotalNotas / cantidadTotalNotas).toFixed(2);
    }
    
}

/**
    Clase Asignatura
    Representa una asignatura que contiene estudiantes matriculados y sus calificaciones.

    Atributos:
    nombre: (Cadena) Nombre de la asignatura.
    listaEstudiantes: (Array) Lista de estudiantes matriculados en la asignatura.
    calificaciones: (Array) Lista de objetos { estudiante, calificaciones } que almacenan las calificaciones de cada estudiante.
    Métodos:
    1.constructor(nombre) Inicializa una nueva asignatura con el nombre proporcionado.

    2.agregarEstudiante(estudiante) Añade un estudiante a la lista de la asignatura e inicializa su registro de calificaciones.

    3.eliminarEstudiante(estudiante) Elimina un estudiante de la lista de la asignatura y su registro de calificaciones.

    4.asignarNota(estudiante, nota) Añade una calificación al estudiante en esta asignatura.

    5.obtenerNotas(estudiante) Devuelve la lista de calificaciones del estudiante en esta asignatura.

    6.promedio(estudiante) Calcula el promedio de las calificaciones del estudiante en esta asignatura.

    7.toString() Devuelve una representación en forma de cadena de la asignatura con el número de estudiantes matriculados.
 */
class Asignatura {
    constructor(nombre) {
        if (!nombre || typeof nombre !== "string") {
            throw new Error("El nombre de la asignatura debe ser una cadena válida.");
        }

        this.nombre = nombre;
        this.listaEstudiantes = [];
        this.calificaciones = []; // Array que contiene { estudiante, calificaciones }
    }

    agregarEstudiante(estudiante) {
        if (!(estudiante instanceof Estudiante)) {
            throw new Error("El estudiante debe ser una instancia de la clase Estudiante.");
        }

        this.listaEstudiantes.push(estudiante);

        if (!this.calificaciones.some(c => c.estudiante === estudiante)) {
            this.calificaciones.push({
                estudiante: estudiante,
                calificaciones: [] // Inicializa un array vacío para las calificaciones
            });
        }
    }

    eliminarEstudiante(estudiante) {
        if (!(estudiante instanceof Estudiante)) {
            throw new Error("El estudiante debe ser una instancia de la clase Estudiante.");
        }

        const index = this.listaEstudiantes.indexOf(estudiante);
        if (index === -1) {
            throw new Error(`El estudiante no está inscrito en la asignatura ${this.nombre}.`);
        }

        this.listaEstudiantes.splice(index, 1);

        // Elimina las calificaciones asociadas al estudiante
        this.calificaciones = this.calificaciones.filter(c => c.estudiante !== estudiante);
    }

    asignarNota(estudiante, nota) {
        if (!(estudiante instanceof Estudiante)) {
            throw new Error("El estudiante debe ser una instancia de la clase Estudiante.");
        }

        if (!this.listaEstudiantes.includes(estudiante)) {
            throw new Error(`El estudiante no está inscrito en la asignatura ${this.nombre}.`);
        }

        if (isNaN(nota) || nota < 0 || nota > 10) {
            throw new Error("La nota debe ser un número entre 0 y 10.");
        }

        const calificacion = this.calificaciones.find(c => c.estudiante === estudiante);
        if (calificacion) {
            calificacion.calificaciones.push(nota); // Agrega la nota al array de calificaciones
        }
    }

    obtenerNotas(estudiante) {
        const calificacion = this.calificaciones.find(c => c.estudiante === estudiante);
        return calificacion && Array.isArray(calificacion.calificaciones) ? calificacion.calificaciones : [];
    }
    
    promedio(estudiante) {
        const notas = this.obtenerNotas(estudiante);
        if (notas.length === 0) {
            return null; // No hay calificaciones
        }

        const suma = notas.reduce((a, b) => a + b, 0);
        return (suma / notas.length).toFixed(2);
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

        //Comprobamos si está en la lista para evitar errores
        for (const id in this.listaEstudiantes) {
            const estudiante = this.listaEstudiantes[id];
            if (estudiante.nombre === nombre && estudiante.direccion.calle === direccion.calle) {
                throw new Error("Ya existe un estudiante con el mismo nombre y dirección.");
            }
        }
        if (!nombre || typeof nombre !== "string" || !/^[a-zA-Z\s]+$/.test(nombre)) {
            throw new Error("Nombre inválido: debe contener solo letras y espacios.");
        }

        if (isNaN(edad) || edad <= 0) {
            throw new Error("Edad inválida: debe ser un número mayor a 0.");
        }

        if (!(direccion instanceof Direccion)) {
            throw new Error("Dirección inválida: debe ser una instancia de la clase Direccion.");
        }

        const nuevoEstudiante = new Estudiante(this.idActual, nombre, edad, direccion);
        this.listaEstudiantes[this.idActual] = nuevoEstudiante;
        this.idActual++;
    }

    eliminarEstudiante(id) {
        if (!this.listaEstudiantes[id]) {
            throw new Error(`No se encontró un estudiante con este ID`);
        }
    
        const estudiante = this.listaEstudiantes[id];
    
        
        estudiante.asignaturas.forEach(asignaturaObj => {
            const asignatura = asignaturaObj.asignatura;
            estudiante.desmatricular(asignatura);
        });
    
        
        delete this.listaEstudiantes[id];
        console.log(`Estudiante con ID ${id} eliminado con éxito.`);
    }
    
    

    obtenerEstudiantePorID(id) {
        const estudiante = this.listaEstudiantes[id];
        if (!estudiante) {
            throw new Error(`No se encontró un estudiante con ID ${id}.`);
        }
        return estudiante;
    }


    generarReporte() {
        for (const id in this.listaEstudiantes) {
            const estudiante = this.listaEstudiantes[id];
            console.log(`ID: ${estudiante.id}, Nombre: ${estudiante.nombre}`);
            console.log("Asignaturas:");
            estudiante.asignaturas.forEach(asignaturaObj => {
                const asignatura = asignaturaObj.asignatura;
                const notas = asignatura.obtenerNotas(estudiante);
                const promedio = asignatura.promedio(estudiante);
                console.log(`- ${asignatura.nombre}, Notas: ${notas.join(", ")}, Promedio: ${promedio}`);
            });
        }
    }

    promedioGeneral() {
        let sumaTotal = 0;
        let cantidadNotas = 0;
    
        for (const id in this.listaEstudiantes) {
            const estudiante = this.listaEstudiantes[id];
            for (const asignaturaObj of estudiante.asignaturas) {
                // Asegúrate de acceder a `asignatura` dentro del objeto
                const asignatura = asignaturaObj.asignatura;
    
                if (asignatura && typeof asignatura.obtenerNotas === 'function') {
                    const notas = asignatura.obtenerNotas(estudiante);
                    for (let i = 0; i < notas.length; i++) {
                        sumaTotal += notas[i];
                        cantidadNotas++;
                    }
                }
            }
        }
    
        if (cantidadNotas === 0) {
            return "No hay calificaciones disponibles para calcular el promedio general.";
        }
    
        return (sumaTotal / cantidadNotas).toFixed(2);
    }
    
      
}

/*
    Menú
    Interfaz principal para interactuar con el sistema.

    Opciones del Menú:
    1.Añadir estudiante Solicita datos y añade un nuevo estudiante.

    2.Eliminar estudiante Solicita un ID y elimina el estudiante correspondiente.

    3.Añadir asignatura Añade una nueva asignatura al sistema.

    4.Eliminar asignatura Elimina una asignatura, desmatriculando a todos los estudiantes inscritos en ella.

    5.Matricular estudiante en asignatura Matricula un estudiante en una asignatura específica.

    6.Desmatricular estudiante de asignatura Desmatricula un estudiante de una asignatura específica.

    7.Asignar nota a un estudiante Asigna una calificación a un estudiante en una asignatura.

    8.Mostrar estudiantes Muestra la lista de estudiantes con sus asignaturas.

    9.Mostrar asignaturas Muestra la lista de asignaturas y los estudiantes matriculados.

    10.Calcular promedio de un estudiante Calcula el promedio general de calificaciones de un estudiante.

    11.Calcular promedio general Calcula el promedio general de todos los estudiantes.

    12.Buscar asignatura por nombre Busca y muestra asignaturas cuyos nombres coincidan con un patrón.

    13.Buscar estudiante por nombre Busca y muestra estudiantes cuyos nombres coincidan con un patrón.

    14.Calcular promedio de una asignatura Calcula el promedio de calificaciones de una asignatura específica.

    15.Salir Finaliza el programa.
*/


const PlistaEstudiantes = new ListaEstudiantes();
const asignaturas = [];


function inicializarDatos() {
    const direccion1 = new Direccion("Calle 1", 10, "3B", "18012", "Granada", "Granada");
    const direccion2 = new Direccion("Calle 2", 20, "1A", "28001", "Madrid", "Madrid");

    PlistaEstudiantes.agregarEstudiante("Juan Perez", 20, direccion1);
    PlistaEstudiantes.agregarEstudiante("Ana Lopez", 22, direccion2);

    const matematicas = new Asignatura("Matemáticas");
    const historia = new Asignatura("Historia");

    asignaturas.push(matematicas, historia);

    const estudiante1 = PlistaEstudiantes.obtenerEstudiantePorID(1);
    const estudiante2 = PlistaEstudiantes.obtenerEstudiantePorID(2);

    estudiante1.matricular(matematicas);
    estudiante2.matricular(historia);

    matematicas.asignarNota(estudiante1, 8.5);
    historia.asignarNota(estudiante2, 9.0);

    console.log("Datos inicializados correctamente.");
}


// Menú principal
function Menu_principal() {
    let opcion;
    do {
        opcion = prompt(
            "=== Menú Principal ===\n" +
            "1. Añadir estudiante\n" +
            "2. Eliminar estudiante\n" +
            "3. Añadir asignatura\n" +
            "4. Eliminar asignatura\n" +
            "5. Matricular estudiante en asignatura\n" +
            "6. Desmatricular estudiante de asignatura\n" +
            "7. Asignar nota a un estudiante\n" +
            "8. Mostrar estudiantes\n" +
            "9. Mostrar asignaturas\n" +
            "10. Calcular promedio de un estudiante\n" +
            "11. Calcular promedio general\n" +
            "12. Buscar asignatura por nombre\n" +
            "13. Buscar estudiante por nombre\n" +
            "14. Calcular promedio de una asignatura\n" +
            "0. Salir\n" +
            "Elige una opción (0-14):"
        );

        try {
            switch (opcion) {
                case "1":
                    Menu_añadirEstudiante();
                    break;
                case "2":
                    Menu_eliminarEstudiante();
                    break;
                case "3":
                    Menu_añadirAsignatura();
                    break;
                case "4":
                    Menu_eliminarAsignatura();
                    break;
                case "5":
                    Menu_matricularEstudiante();
                    break;
                case "6":
                    Menu_desmatricularEstudiante();
                    break;
                case "7":
                    Menu_asignarNota();
                    break;
                case "8":
                    Menu_mostrarEstudiantes();
                    break;
                case "9":
                    Menu_mostrarAsignaturas();
                    break;
                case "10":
                    Menu_calcularPromedioIndividual();
                    break;
                case "11":
                    Menu_calcularPromedioGeneral();
                    break;
                case "12":
                    Menu_buscarAsignatura();
                    break;
                case "13":
                    Menu_buscarEstudiante();
                    break;
                case "14":
                    Menu_calcularPromedioAsignatura();
                    break;
                case "0":
                    alert("Saliendo del programa...");
                    break;
                default:
                    alert("Opción no válida. Por favor, selecciona un número entre 0 y 14.");
            }
        } catch (error) {
            alert("Error: " + error.message);
        }
    } while (opcion !== "0");
}



// Funciones del menú
function Menu_añadirEstudiante() {
    const nombre = prompt("Introduce el nombre del estudiante:");
    const edad = parseInt(prompt("Introduce la edad del estudiante:"), 10);
    const calle = prompt("Introduce la calle de la dirección:");
    const numero = prompt("Introduce el número de la dirección:");
    const piso = prompt("Introduce el piso:");
    const codPostal = prompt("Introduce el código postal:");
    const provincia = prompt("Introduce la provincia:");
    const localidad = prompt("Introduce la localidad:");

    const direccion = new Direccion(calle, numero, piso, codPostal, provincia, localidad);
    PlistaEstudiantes.agregarEstudiante(nombre, edad, direccion);
    console.log(`Estudiante ${nombre} añadido con éxito.`);
}

function Menu_eliminarEstudiante(){

    const id = parseInt(prompt("Introduce el ID del estudiante que deseas eliminar:"), 10);
    PlistaEstudiantes.eliminarEstudiante(id);
}

function Menu_añadirAsignatura() {
    const nombre = prompt("Introduce el nombre de la asignatura:");
    const nuevaAsignatura = new Asignatura(nombre);
    asignaturas.push(nuevaAsignatura);
    console.log(`Asignatura ${nombre} añadida con éxito.`);
}

function Menu_eliminarAsignatura() {
    const nombreAsignatura = prompt("Introduce el nombre de la asignatura a eliminar:");
    const asignatura = asignaturas.find(
        function(a) {
        return a.nombre === nombreAsignatura;
    });

    if (!asignatura) {
        console.log('No se encontró ninguna asignatura con el nombre "' + nombreAsignatura + '".');
        return;
    }

    // Desmatricular a los estudiantes inscritos en la asignatura
    while (asignatura.listaEstudiantes.length > 0) {
        const estudiante = asignatura.listaEstudiantes[0];
        estudiante.desmatricular(asignatura); // Usa el método de la clase Estudiante
    }

    // Eliminar la asignatura del array global
    const index = asignaturas.indexOf(asignatura);
    if (index !== -1) {
        asignaturas.splice(index, 1);
    }

    console.log('La asignatura "' + nombreAsignatura + '" ha sido eliminada junto con sus matriculaciones.');
}

function Menu_matricularEstudiante() {
    const idEstudiante = parseInt(prompt("Introduce el ID del estudiante a matricular:"), 10);
    const nombreAsignatura = prompt("Introduce el nombre de la asignatura:");

    const estudiante = PlistaEstudiantes.obtenerEstudiantePorID(idEstudiante);
    const asignatura = asignaturas.find(a => a.nombre === nombreAsignatura);

    if (!asignatura) {
        throw new Error("No se encontró una asignatura con ese nombre.");
    }

    estudiante.matricular(asignatura);
    console.log(`Estudiante ${estudiante.nombre} matriculado en ${asignatura.nombre}.`);
}

function Menu_desmatricularEstudiante() {
    const idEstudiante = parseInt(prompt("Introduce el ID del estudiante a desmatricular:"), 10);
    const nombreAsignatura = prompt("Introduce el nombre de la asignatura:");

    const estudiante = PlistaEstudiantes.obtenerEstudiantePorID(idEstudiante);
    const asignatura = asignaturas.find(a => a.nombre === nombreAsignatura);

    if (!asignatura) {
        throw new Error("No se encontró una asignatura con ese nombre.");
    }

    estudiante.desmatricular(asignatura);
    console.log(`Estudiante ${estudiante.nombre} desmatriculado de ${asignatura.nombre}.`);
}

function Menu_asignarNota() {
    const idEstudiante = parseInt(prompt("Introduce el ID del estudiante:"), 10);
    const nombreAsignatura = prompt("Introduce el nombre de la asignatura:");
    const nota = parseFloat(prompt("Introduce la nota del estudiante (0-10):"));

    const estudiante = PlistaEstudiantes.obtenerEstudiantePorID(idEstudiante);
    const asignatura = asignaturas.find(a => a.nombre === nombreAsignatura);

    if (!asignatura) {
        throw new Error("No se encontró una asignatura con ese nombre.");
    }

    asignatura.asignarNota(estudiante, nota);
    console.log(`Nota ${nota} asignada a ${estudiante.nombre} en ${asignatura.nombre}.`);
}

function Menu_mostrarEstudiantes() {
    console.log("Estudiantes registrados:");

    for (const id in PlistaEstudiantes.listaEstudiantes) {
        const estudiante = PlistaEstudiantes.listaEstudiantes[id];
        console.log(`ID: ${estudiante.id}, Nombre: ${estudiante.nombre}, Edad: ${estudiante.edad}`);
        console.log("Asignaturas matriculadas:");

        if (estudiante.asignaturas.length === 0) {
            console.log("- No tiene asignaturas matriculadas.");
        } else {
            estudiante.asignaturas.forEach(asignaturaObj => {
                console.log(`  - ${asignaturaObj.asignatura.nombre} (Fecha de matrícula: ${asignaturaObj.fechaMatricula})`);
            });
            
        }
    }
}



function Menu_mostrarAsignaturas() {
    console.log("Asignaturas registradas:");
    for (const asignatura of asignaturas) {
        console.log(asignatura.nombre);
        console.log("Estudiantes inscritos:");
        for (const estudiante of asignatura.listaEstudiantes) {
            console.log(`- ${estudiante.nombre}`);
        }
    }
}

function Menu_calcularPromedioIndividual() {
    const idEstudiante = parseInt(prompt("Introduce el ID del estudiante:"), 10);
    const estudiante = PlistaEstudiantes.obtenerEstudiantePorID(idEstudiante);

    const promedio = estudiante.promedioIndividual();
    console.log(`Promedio general de ${estudiante.nombre}: ${promedio}`);
}




function Menu_calcularPromedioGeneral() {
    console.log(`Promedio general de todos los estudiantes: ${PlistaEstudiantes.promedioGeneral()}`);
}

function Menu_calcularPromedioAsignatura() {
    const nombreAsignatura = prompt("Introduce el nombre de la asignatura para calcular su promedio:");
    const asignatura = asignaturas.find(function(a) {
        return a.nombre === nombreAsignatura;
    });

    if (!asignatura) {
        console.log('No se encontró ninguna asignatura con el nombre "' + nombreAsignatura + '".');
        return;
    }

    let sumaTotalNotas = 0;
    let cantidadTotalNotas = 0;

    for (let i = 0; i < asignatura.listaEstudiantes.length; i++) {
        const estudiante = asignatura.listaEstudiantes[i];
        const notas = asignatura.obtenerNotas(estudiante);
        for (let j = 0; j < notas.length; j++) {
            sumaTotalNotas += notas[j];
            cantidadTotalNotas++;
        }
    }

    if (cantidadTotalNotas === 0) {
        console.log('No hay notas asignadas en la asignatura "' + nombreAsignatura + '".');
    } else {
        const promedio = (sumaTotalNotas / cantidadTotalNotas).toFixed(2);
        console.log('El promedio de la asignatura "' + nombreAsignatura + '" es: ' + promedio);
    }
}

function Menu_buscarAsignatura(){
    const patron =  prompt("Introduce el patron de busqueda para buscar la asignatura ");
    const resultados = [];

    for (const asignatura of asignaturas) {
        if (asignatura.nombre.startsWith(patron)) {
            resultados.push(asignatura.toString());
        }
    }

    if (resultados.length === 0) {
        console.log(`No se encontraron asignaturas que comiencen con ese patron.`);
    } else {
        console.log(`Asignaturas encontradas:\n${resultados.join("\n")}`);
    }

    
}

function Menu_buscarEstudiante() {
    const patron = prompt("Introduce el patrón de búsqueda para buscar al estudiante:");
    const resultados = [];

    // Iterar sobre los estudiantes en PlistaEstudiantes
    for (const id in PlistaEstudiantes.listaEstudiantes) {
        const estudiante = PlistaEstudiantes.listaEstudiantes[id];

        if (estudiante.nombre.startsWith(patron)) {
            resultados.push(estudiante);
        }
    }

    // Comprobar si hay resultados
    if (resultados.length === 0) {
        console.log("No se encontraron estudiantes que comiencen con ese patrón.");
    } else {
        console.log("Estudiantes encontrados:");
        resultados.forEach(function(estudiante) {
            console.log(estudiante.toString()); // Usa el método toString() de la clase Estudiante
        });
    }
}


inicializarDatos();
Menu_principal();
