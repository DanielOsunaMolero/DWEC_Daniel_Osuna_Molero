/*
Enlace a GitHub

https://github.com/DanielOsunaMolero/DWEC_OsunaMolero_Daniel/blob/ramal/Proyecto%20primer%20trimestre%20Daniel%20Osuna/Proyecto.js*/ 


/**
 * Clase Direccion
 * Representa una dirección con datos detallados.
 *
 * Atributos:
 * - _calle (string): Nombre de la calle.
 * - _numero (number): Número de la dirección.
 * - _piso (string): Piso o apartamento.
 * - _codPostal (string): Código postal (5 dígitos).
 * - _provincia (string): Provincia de la dirección.
 * - _localidad (string): Localidad de la dirección.
 *
 * Métodos:
 * - constructor(calle, numero, piso, codPostal, provincia, localidad): Inicializa una nueva dirección.
 * - toString(): Devuelve una representación en forma de cadena de la dirección.
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
    
    
    
/**
 * Clase Persona
 * Clase base que encapsula atributos y comportamientos comunes de una persona.
 *
 * Atributos:
 * - _nombre (string): Nombre de la persona.
 * - _edad (number): Edad de la persona.
 * - _direccion (Direccion): Dirección de la persona (instancia de la clase Direccion).
 *
 * Métodos:
 * - constructor(nombre, edad, direccion): Inicializa los datos de una persona.
 * - toString(): Devuelve una representación en forma de cadena de la persona.
 */

    class Persona {
    constructor(nombre, edad, direccion) {
        this._nombre = nombre;
        this._edad = edad;
        this._direccion = direccion;
    }

    toString() {
        return `Nombre: ${this._nombre}, Edad: ${this._edad}, Dirección: ${this._direccion}`;
    }
}

    
    

/**
 * Clase Estudiante
 * Representa a un estudiante que hereda de la clase Persona.
 *
 * Atributos:
 * - _id (number): Identificador único del estudiante.
 * - _asignaturas (Array): Lista de asignaturas en las que el estudiante está matriculado. Cada elemento es un objeto con:
 *   - asignatura (Asignatura): Instancia de la clase Asignatura.
 *   - fechaMatricula (string): Fecha de matrícula en formato DD/MM/AAAA.
 *
 * Métodos:
 * - constructor(id, nombre, edad, direccion): Inicializa un estudiante con los datos proporcionados.
 * - matricular(asignatura): Matricula al estudiante en una asignatura.
 * - desmatricular(asignatura): Desmatricula al estudiante de una asignatura.
 * - promedioIndividual(): Calcula el promedio de todas las asignaturas del estudiante.
 * - mostrarAsignaturas(): Muestra la lista de asignaturas matriculadas.
 * - toString(): Devuelve una representación en forma de cadena del estudiante.
 */

class Estudiante extends Persona {
    constructor(id, nombre, edad, direccion) {
        super(nombre, edad, direccion);
        this._id = id;
        this._asignaturas = [];
    }

    matricular(asignatura) {
        this._asignaturas.push({ asignatura, fechaMatricula: new Date().toLocaleDateString("es-ES") });
        asignatura.agregarEstudiante(this);
    }

    desmatricular(asignatura) {
        try{
            const index = this._asignaturas.findIndex(a => a.asignatura === asignatura);
            if (index === -1) throw new Error("El estudiante no está matriculado en esta asignatura.");
            this._asignaturas.splice(index, 1);
            asignatura.listaEstudiantes = asignatura.listaEstudiantes.filter(est => est !== this);
        
        } catch (error){
            console.error("Error al desmatricular" , error.message);
        }
    }
    

    promedioIndividual() {
        const notas = this._asignaturas.flatMap(a => a.asignatura.obtenerNotas(this));
        return notas.length ? (notas.reduce((sum, val) => sum + val, 0) / notas.length).toFixed(2) : "No hay calificaciones disponibles.";
    }
    

    mostrarAsignaturas() {
        console.log(`Asignaturas de ${this._nombre}:`);
        this._asignaturas.forEach(a => console.log(`- ${a.asignatura.nombre}`));
    }

    toString() {
        return `ID: ${this._id}, ${super.toString()}`;
    }
}



/**
 * Clase Asignatura
 * Representa una asignatura con estudiantes matriculados y calificaciones.
 *
 * Atributos:
 * - nombre (string): Nombre de la asignatura.
 * - listaEstudiantes (Array): Lista de estudiantes matriculados.
 * - calificaciones (Array): Lista de objetos que almacenan calificaciones por estudiante.
 *
 * Métodos:
 * - constructor(nombre): Inicializa una asignatura.
 * - agregarEstudiante(estudiante): Añade un estudiante a la lista.
 * - asignarNota(estudiante, nota): Asigna una calificación a un estudiante.
 * - obtenerNotas(estudiante): Devuelve las calificaciones de un estudiante.
 * - calcularPromedio(): Calcula el promedio de calificaciones de la asignatura.
 * - mostrarEstudiantes(): Muestra la lista de estudiantes matriculados.
 * - toString(): Devuelve una representación en forma de cadena de la asignatura.
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
 * Clase ListaEstudiantes
 * Administra una lista de estudiantes, permitiendo su gestión global.
 *
 * Atributos:
 * - listaEstudiantes (Object): Diccionario de estudiantes con el ID como clave.
 * - idActual (number): ID único incremental para nuevos estudiantes.
 *
 * Métodos:
 * - constructor(): Inicializa la lista y el contador de IDs.
 * - agregarEstudiante(nombre, edad, direccion): Añade un nuevo estudiante.
 * - eliminarEstudiante(id): Elimina un estudiante por su ID.
 * - mostrarEstudiantes(): Muestra la lista de estudiantes.
 * - calcularPromedioGeneral(): Calcula el promedio general de calificaciones.
 * - buscarEstudiantePorNombre(patron): Busca estudiantes por su nombre.
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
                console.log(`Asignatura: ${a.nombre}, Estudiantes matriculados: ${a.listaEstudiantes.length}`);
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