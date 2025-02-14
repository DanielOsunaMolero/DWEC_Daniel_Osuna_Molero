/**
 * 2. Definición de Clases
 * 
 * En esta parte se importan las clases Direccion, Estudiante, Asignatura, ListaEstudiantes.
 * Todas las clases están en sus respecitivos archivos.
 */

import { Direccion } from './Direccion.js';
import { Asignatura } from './Asignatura.js';
import { Estudiante } from './Estudiante.js';
import { ListaEstudiantes } from './ListaEstudiantes.js';



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