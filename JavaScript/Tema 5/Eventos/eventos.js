let botonver = document.querySelector("#mouseOver");
let botonEliminar =  document.querySelector("#eliminar");
let botonAnyadir= document.querySelector("#anyadir");
let caja_texto= document.querySelector("p.informacion");


//propagacion de eventos --> delegacion de eventos


//Fase 1 capturing (captura)

//window > document > html > body > section > article
//NO ES A FASE POR DEFECTO 

document.body.addEventListener("mouseover", 
    (evento)=>{
    console.log("Fase de captura : el evento ha llegado a"
    + evento.currentTarget.tagName + "pero lo ha lanzado"+ evento.
    target);
}, {capture:true});


//Fase 2 target (objetivo)



//Fase 3 bubbling (burbujeo) 
// //p > section > body > html > document > window

document.querySelector("p").addEventListener("mouseover",
    (evento)=>{
        console.log("Fase de captura : el evento ha llegado a "
        + evento.currentTarget.tagName + " pero lo ha lanzado"+ evento.
        target.tagName);
},{capture:true})

document.querySelector("article").addEventListener("click",
    (evento)=>{
        console.log("Fase de burbujeo : el evento ha llegado a "
        + evento.currentTarget.tagName + " pero lo ha lanzado"+ evento.
        target.tagName);
},{capture:true})

document.querySelector("section").addEventListener("click",
    (evento)=>{
        console.log("Fase de captura : el evento ha llegado a "
        + evento.currentTarget.tagName + " pero lo ha lanzado"+ evento.
        target.tagName);
},{capture:true})

document.querySelector("article").addEventListener("click",
    (evento)=>{
        console.log("Fase de captura : el evento ha llegado a "
        + evento.currentTarget.tagName + " pero lo ha lanzado"+ evento.
        target.tagName);
},{capture:true})













