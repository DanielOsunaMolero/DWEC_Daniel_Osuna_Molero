document.addEventListener("DOMContentLoaded", function () {
    const alumnos = JSON.parse(localStorage.getItem("alumnos")) || [];
    const asignaturas = JSON.parse(localStorage.getItem("asignaturas")) || [];
    
    function renderLista() {
        const lista = document.getElementById("lista-alumnos");
        lista.innerHTML = "";
        alumnos.forEach((alumno, index) => {
            const li = document.createElement("li");
            const asignaturasTexto = alumno.asignaturas.length > 0 
                ? `<br> Asignaturas: <br> - ${alumno.asignaturas.join("<br> - ")}` 
                : "<br> Asignaturas: Ninguna";
            li.innerHTML = `ID: ${alumno.id} <br> Nombre: ${alumno.nombre} <br> Edad: ${alumno.edad}  ${asignaturasTexto}`;
            
            const btnEliminar = document.createElement("button");
            btnEliminar.textContent = "Desmatricular";
            btnEliminar.onclick = () => eliminarEstudiante(index);
            lista.appendChild(li);
        });
    }


    function renderListaAsignaturas() {
        const lista = document.getElementById("lista-asignaturas");
        lista.innerHTML = "";
        asignaturas.forEach((asignatura, index) => {
            const li = document.createElement("li");
            li.textContent = asignatura;
            lista.appendChild(li);
        });
    }

    function agregarEstudiante() {
        let nextId = alumnos.length > 0 ? Math.max(...alumnos.map(a => a.id)) + 1 : 1; 
        //Recorre la lista de estudiantes y obtiene el id más alto y le suma 1 a ese ID para obtener el ID del nuevo estudiante
        const nombre = document.getElementById("nombre").value;
        const edad = document.getElementById("edad").value;
        const calle = document.getElementById("calle").value;
        const numero = document.getElementById("numero").value;
        const piso = document.getElementById("piso").value;
        const codPostal = document.getElementById("codPostal").value;
        const provincia = document.getElementById("provincia").value;
        const localidad = document.getElementById("localidad").value;

        if (nombre && edad && codPostal.length === 5) {
            alumnos.push({ id: nextId++, nombre, edad, direccion: { calle, numero, piso, codPostal, provincia, localidad }, asignaturas: [], notas: {} });
            localStorage.setItem("nextId", nextId);
            localStorage.setItem("alumnos", JSON.stringify(alumnos));
            renderLista();
        } else {
            alert("Por favor, completa todos los campos correctamente.");
        }
    }

    function eliminarEstudiante() {
        const id = document.getElementById("id-eliminar").value;
        const index = alumnos.findIndex(a => a.id == id);
        if (index !== -1) {
            alumnos.splice(index, 1);
            localStorage.setItem("alumnos", JSON.stringify(alumnos));
            renderLista();
            alert("Estudiante eliminado correctamente.");
        } else {
            alert("No se encontró un estudiante con ese ID.");
        }
    }

    function agregarAsignatura() {
        const nombreAsignatura = document.getElementById("nombre-asignatura").value;
        if (nombreAsignatura && !asignaturas.includes(nombreAsignatura)) {
            asignaturas.push(nombreAsignatura);
            localStorage.setItem("asignaturas", JSON.stringify(asignaturas));
            alert("Asignatura agregada correctamente.");
            renderListaAsignaturas();
        }
    }

    function eliminarAsignatura(nombreAsignatura) {
        const index = asignaturas.indexOf(nombreAsignatura);
        if (index !== -1) {
            asignaturas.splice(index, 1);
            alumnos.forEach(alumno => {
                alumno.asignaturas = alumno.asignaturas.filter(asig => asig !== nombreAsignatura);
            });
            localStorage.setItem("asignaturas", JSON.stringify(asignaturas));
            localStorage.setItem("alumnos", JSON.stringify(alumnos));
            renderListaAsignaturas();
            renderLista();
            alert("Asignatura eliminada correctamente.");
        } else {
            alert("No se encontró la asignatura.");
        }
    }

    document.getElementById("btn-eliminar-asignatura").addEventListener("click", function() {
        const nombreAsignatura = document.getElementById("nombre-asignatura-eliminar").value;
        eliminarAsignatura(nombreAsignatura);
    });
    


    function matricularEnAsignatura() {
        const nombreEstudiante = document.getElementById("nombre-estudiante-matricula").value;
        const nombreAsignatura = document.getElementById("nombre-asignatura-matricula").value;
        const alumno = alumnos.find(a => a.nombre === nombreEstudiante);
        if (alumno && asignaturas.includes(nombreAsignatura)) {
            alumno.asignaturas.push(nombreAsignatura);
            localStorage.setItem("alumnos", JSON.stringify(alumnos));
            alert("Matriculación realizada correctamente.");
        }
        renderLista();
    }

    function desmatricularDeAsignatura() {
        const nombreEstudiante = document.getElementById("nombre-estudiante-desmatricula").value;
        const nombreAsignatura = document.getElementById("nombre-asignatura-desmatricula").value;
        const alumno = alumnos.find(a => a.nombre === nombreEstudiante);
        if (alumno) {
            alumno.asignaturas = alumno.asignaturas.filter(a => a !== nombreAsignatura);
            localStorage.setItem("alumnos", JSON.stringify(alumnos));
            alert("Desmatriculación realizada correctamente.");
        }
        renderLista();
    }

    function asignarNota() {
        const nombreEstudiante = document.getElementById("nombre-estudiante-nota").value;
        const nombreAsignatura = document.getElementById("nombre-asignatura-nota").value;
        const nota = parseFloat(document.getElementById("nota").value);
        const alumno = alumnos.find(a => a.nombre === nombreEstudiante);
        if (alumno && asignaturas.includes(nombreAsignatura)) {
            alumno.notas[nombreAsignatura] = nota;
            localStorage.setItem("alumnos", JSON.stringify(alumnos));
            alert("Nota asignada correctamente.");
        }
    }

    function calcularPromedioEstudiante() {
        const nombreEstudiante = document.getElementById("nombre-estudiante-promedio").value;
        const alumno = alumnos.find(a => a.nombre === nombreEstudiante);
        if (alumno) {
            const notas = Object.values(alumno.notas);
            const promedio = notas.reduce((sum, nota) => sum + nota, 0) / notas.length;
            alert(`El promedio de ${nombreEstudiante} es: ${promedio.toFixed(2)}`);
        }
    }

    function calcularPromedioGeneral() {
        const todasLasNotas = alumnos.flatMap(a => Object.values(a.notas));
        const promedioGeneral = todasLasNotas.reduce((sum, nota) => sum + nota, 0) / todasLasNotas.length;
        alert(`El promedio general de todos los estudiantes es: ${promedioGeneral.toFixed(2)}`);
    }

    function limpiarCampos() {
        document.querySelectorAll("input").forEach(input => input.value = "");
    }

    // Añadir datos de prueba si no existen en localStorage
    if (alumnos.length === 0 && asignaturas.length === 0) {
        alumnos.push(
            { id: nextId++, nombre: "Carlos", edad: 20, direccion: { calle: "Av. Siempre Viva", numero: 742, piso: "A", codPostal: "28010", provincia: "Madrid", localidad: "Madrid" }, asignaturas: [], notas: {} },
            { id: nextId++, nombre: "Ana", edad: 22, direccion: { calle: "Calle Primavera", numero: 12, piso: "2B", codPostal: "18012", provincia: "Granada", localidad: "Granada" }, asignaturas: [], notas: {} },
            { id: nextId++, nombre: "Luis", edad: 21, direccion: { calle: "Paseo del Prado", numero: 5, piso: "3C", codPostal: "28014", provincia: "Madrid", localidad: "Madrid" }, asignaturas: [], notas: {} }
        );
        
        asignaturas.push("Matemáticas", "Física");
        
        localStorage.setItem("alumnos", JSON.stringify(alumnos));
        localStorage.setItem("asignaturas", JSON.stringify(asignaturas));
        localStorage.setItem("nextId", nextId);
    }



    document.getElementById("btn-limpiar-campos").addEventListener("click", limpiarCampos);
    document.getElementById("btn-matricular").addEventListener("click", agregarEstudiante);
    document.getElementById("btn-agregar-asignatura").addEventListener("click", agregarAsignatura);
    document.getElementById("btn-matricular-asignatura").addEventListener("click", matricularEnAsignatura);
    document.getElementById("btn-asignar-nota").addEventListener("click", asignarNota);
    document.getElementById("btn-promedio-estudiante").addEventListener("click", calcularPromedioEstudiante);
    document.getElementById("btn-promedio-general").addEventListener("click", calcularPromedioGeneral);
    document.getElementById("btn-eliminar-estudiante").addEventListener("click", eliminarEstudiante);
    document.getElementById("btn-desmatricular-asignatura").addEventListener("click", desmatricularDeAsignatura);

    renderLista();
    renderListaAsignaturas();
});
