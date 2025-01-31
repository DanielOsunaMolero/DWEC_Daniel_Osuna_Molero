/*
Enlace a GitHub

https://github.com/DanielOsunaMolero/DWEC_OsunaMolero_Daniel/blob/ramal/Proyecto%20primer%20trimestre%20Daniel%20Osuna/Proyecto.js*/ 


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
    
        toString() {
            return `ID: ${this.#id}, Nombre: ${this._nombre}, Edad: ${this._edad}, Dirección: ${this._direccion}`;
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

    10.promedioGeneral() Calcula el promedio general de todas las asignaturas en las que el estudiante está matriculado.
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

    matricular(asignatura) {
        this.#asignaturas.push({ asignatura, fechaMatricula: new Date().toLocaleDateString("es-ES") });
        asignatura.agregarEstudiante(this);
    }

    desmatricular(asignatura) {
        const index = this.#asignaturas.findIndex(a => a.asignatura === asignatura);
        if (index === -1) throw new Error("El estudiante no está matriculado en esta asignatura.");
        this.#asignaturas.splice(index, 1);
        asignatura.listaEstudiantes = asignatura.listaEstudiantes.filter(est => est !== this);
    }

    promedioIndividual() {
        const notas = this.#asignaturas.flatMap(a => a.asignatura.obtenerNotas(this));
        return notas.length ? (notas.reduce((sum, val) => sum + val, 0) / notas.length).toFixed(2) : "No hay calificaciones disponibles.";
    }

    mostrarAsignaturas() {
        console.log(`Asignaturas de ${this._nombre}:`);
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
    
        agregarEstudiante(estudiante) {
            this.listaEstudiantes.push(estudiante);
            if (!this.calificaciones.some(c => c.estudiante === estudiante)) {
                this.calificaciones.push({ estudiante, calificaciones: [] });
            }
        }
    
        asignarNota(estudiante, nota) {
            if (nota < 0 || nota > 10) throw new Error("Nota inválida.");
            const registro = this.calificaciones.find(c => c.estudiante === estudiante);
            registro.calificaciones.push(nota);
        }
    
        obtenerNotas(estudiante) {
            const registro = this.calificaciones.find(c => c.estudiante === estudiante);
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
            this.idActual++;
            console.log(`Estudiante ${nombre} añadido con éxito.`);
        }
    
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
        
    
        mostrarEstudiantes() {
            for (const id in this.listaEstudiantes) {
                console.log(this.listaEstudiantes[id].toString());
            }
        }
    
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

///////////////////////////////////PRUEBAS///////////////////////////////////////

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

    prompt("Datos inicializados correctamente. Presiona Enter para continuar.");
}

// Inicialización de datos directamente
const direccion1 = new Direccion("Calle Primavera", 15, "2A", "28010", "Madrid", "Madrid");
const direccion2 = new Direccion("Calle Invierno", 22, "3B", "18012", "Granada", "Granada");
const direccion3 = new Direccion("Calle Verano", 5, "1C", "41013", "Sevilla", "Sevilla");

// Agregar estudiantes
const PlistaEstudiantes = new ListaEstudiantes();
PlistaEstudiantes.agregarEstudiante("Juan Pérez", 20, direccion1);
PlistaEstudiantes.agregarEstudiante("Ana López", 22, direccion2);
PlistaEstudiantes.agregarEstudiante("Carlos García", 21, direccion3);

// Crear asignaturas
const asignaturas = [];
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

// Menú principal
let continuar = true;
while (continuar) {
    const opcion = prompt(`
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
Escribe tu opción:`);

    switch (opcion) {
        case "1":
            const nombre = prompt("Nombre del estudiante:");
            const edad = parseInt(prompt("Edad del estudiante:"), 10);
            const calle = prompt("Calle de la dirección:");
            const numero = prompt("Número de la dirección:");
            const piso = prompt("Piso de la dirección:");
            const codPostal = prompt("Código postal de la dirección:");
            const provincia = prompt("Provincia de la dirección:");
            const localidad = prompt("Localidad de la dirección:");
            const direccion = new Direccion(calle, numero, piso, codPostal, provincia, localidad);
            PlistaEstudiantes.agregarEstudiante(nombre, edad, direccion);
            console.log(`Estudiante ${nombre} añadido con éxito.`);
            break;

        case "2":
            const idEliminar = parseInt(prompt("ID del estudiante a eliminar:"), 10);
            PlistaEstudiantes.eliminarEstudiante(idEliminar);
            console.log(`Estudiante con ID ${idEliminar} eliminado.`);
            break;

        case "3":
            console.log("Lista de estudiantes:");
            for (const id in PlistaEstudiantes.listaEstudiantes) {
                console.log(PlistaEstudiantes.listaEstudiantes[id].toString());
                PlistaEstudiantes.listaEstudiantes[id].mostrarAsignaturas();
            }
            break;

        case "4":
            const nombreAsignatura = prompt("Nombre de la asignatura:");
            asignaturas.push(new Asignatura(nombreAsignatura));
            console.log(`Asignatura ${nombreAsignatura} añadida con éxito.`);
            break;

        case "5":
            console.log("Lista de asignaturas:");
            asignaturas.forEach(a => {
                console.log(`${a.nombre}, Estudiantes matriculados: ${a.listaEstudiantes.length}`);
            });
            break;

        case "6":
            const idEstMatricular = parseInt(prompt("ID del estudiante a matricular:"), 10);
            const nombreAsigMatricular = prompt("Nombre de la asignatura:");
            const estudianteMatricular = PlistaEstudiantes.listaEstudiantes[idEstMatricular];
            const asignaturaMatricular = asignaturas.find(a => a.nombre === nombreAsigMatricular);
            if (estudianteMatricular && asignaturaMatricular) {
                estudianteMatricular.matricular(asignaturaMatricular);
                console.log(`Estudiante matriculado con éxito.`);
            } else {
                console.log("Estudiante o asignatura no encontrados.");
            }
            break;

        case "7":
            const idEstDesmatricular = parseInt(prompt("ID del estudiante a desmatricular:"), 10);
            const nombreAsigDesmatricular = prompt("Nombre de la asignatura:");
            const estudianteDesmatricular = PlistaEstudiantes.listaEstudiantes[idEstDesmatricular];
            const asignaturaDesmatricular = asignaturas.find(a => a.nombre === nombreAsigDesmatricular);
            if (estudianteDesmatricular && asignaturaDesmatricular) {
                estudianteDesmatricular.desmatricular(asignaturaDesmatricular);
                console.log(`Estudiante desmatriculado con éxito.`);
            } else {
                console.log("Estudiante o asignatura no encontrados.");
            }
            break;

        case "8":
            const idEstNota = parseInt(prompt("ID del estudiante:"), 10);
            const nombreAsigNota = prompt("Nombre de la asignatura:");
            const nota = parseFloat(prompt("Introduce la nota (0-10):"));
            const estudianteNota = PlistaEstudiantes.listaEstudiantes[idEstNota];
            const asignaturaNota = asignaturas.find(a => a.nombre === nombreAsigNota);
            if (estudianteNota && asignaturaNota) {
                asignaturaNota.asignarNota(estudianteNota, nota);
                console.log(`Nota asignada con éxito.`);
            } else {
                console.log("Estudiante o asignatura no encontrados.");
            }
            break;

        case "9":
            const idEstPromedio = parseInt(prompt("ID del estudiante:"), 10);
            const estudiantePromedio = PlistaEstudiantes.listaEstudiantes[idEstPromedio];
            if (estudiantePromedio && estudiantePromedio._asignaturas.length > 0) {
                console.log(`Promedio: ${estudiantePromedio.promedioIndividual()}`);
            } else {
                console.log("No hay asignaturas matriculadas o el estudiante no existe.");
            }
            break;

        case "10":
            let sumaPromedios = 0;
            let totalEstudiantes = 0;
            for (const id in PlistaEstudiantes.listaEstudiantes) {
                const promedio = parseFloat(PlistaEstudiantes.listaEstudiantes[id].promedioIndividual());
                if (!isNaN(promedio)) {
                    sumaPromedios += promedio;
                    totalEstudiantes++;
                }
            }
            const promedioGeneral = totalEstudiantes ? (sumaPromedios / totalEstudiantes).toFixed(2) : 0;
            console.log(`Promedio general: ${promedioGeneral}`);
            break;

        case "0":
            console.log("Saliendo del programa...");
            continuar = false;
            break;

        default:
            console.log("Opción no válida. Por favor, introduce un número entre 0 y 10.");
    }
}