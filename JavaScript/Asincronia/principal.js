const trabajador = new Worker("./worker.js");

trabajador.postMessage("A trabajar");

trabajador.addEventListener("message",()=>{
    console.log(EventCounts.data);
});