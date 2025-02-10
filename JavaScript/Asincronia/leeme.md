asincronia

1.- Asincronia

CICLO DE EVENTOS (event loop) -> como se ejceutan las instrucciones en JS
Intruccion secuencialmente y hasta que no 

Pila de ejecucion (call stack) -> inst sincronas

cola de tareas( task queue  -> instruciones asincronas)





mecanismos
    -funciones globales - setTimeout , setInterval
    -evento 


# Promesas
Un objeto que representa el estado de una operacion asncrona
-pendiente(pending)
-cumplida
-rechazada

Metodos
    then() -> gets el rersultado cuando tiene exito
    catch() -> resultad cuando no tiene exito
    finally() -> opcional

    all()
    any()
    race()
    allSettled()

    promesa.then(
        codigo que lee datos
    )catch(
        codigo de error
    )

    -API fetch
        -fetch(url) -> hace la solicitud
        -request -> solicitud HTTP
        -response -> respuesta del serv.
            -status -> 200,203,403
            -ok
            -headers
            -url
            -type(basic,cors,etc)
            -json()
            -blob (imagen , pdf)
            -text()
        -headers
        -formData

TRABAJADORES WEN

Hilo de ejecucion


codigo sincrono -> pila de ejecucion -> console.log(for)
codigo asincrono -> cpña de microtareas -> (mas prioridad) promesas NO SE PUEDE INTERRUMPIR
codigo asincrono -> cola de tareas -> eventos (menos prioridad ) se puede interrumpir

//metodos
trabajador.postMessage("msj")

self.postMessage("msj") -> msj del ttrabajo al hilo principal


//eventos

-message 

tarbajador.addEventListener("message", (evento) => {
    console.log("he recibido + evento.mensaje")
});

-error

trabajador.onerror()=>{
    console.log("ocurrio un error")
}
