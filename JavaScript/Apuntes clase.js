// /*let edad =  17;
// function mayoria_edad(edad = 15){
//    if(edad <  17) {
//      return false;
//    }else{
//     return true; 
//    }
// }
//    console.log(mayoria_edad(20));
// */ 


// /* let saluda = function(){
//     return ("hola");
// } 

// let hola = saluda;
// hola();
// saluda();
// */

// /*let operacion_suma = function(a,b){
//     return (a+b);
// }

// operacion_suma(5,5);

// let suma1= operacion_suma(3,3);
// let suma2= operacion_suma(4,4);
// console.log(suma1);
// console.log(suma2); */


// /*
// function saluda(quien){
//     if(quien){
// console.log(`hola ${quien}`);
//     }else{
//         saluda("invitado");
//     }
// }

// saluda();
// */

// /*let resta =(a,b) =>{
//     console.log("restando");
//     return(a-b);
// }
// let resta2 = (a,b)=>{
//     let aux;
//     (1) ? aux = (a-b) : aux = (b-a);
//     return aux;
// }
// resta(5,2);
// resta2(5,2); */

// //callback functionns


//     /*function preguntar(pregunta , si , no){
//         if(confirm(pregunta)){
//             si();
//         }
//         else {
//             no();
//         }
//     }

//     function afirmativo(){
//         console.log("acertaste");
//     }
//     function negativo(){
//         console.log("rechazaste");
//     }

//     preguntar("Aceptas las condiciones?", afirmativo , negativo);


//     */

//     /*
//     function calculadora(a,b,operacion){

//         return(operacion(a,b));
//     }

//     let suma = (a,b) => (a+b);
//     let resta = (a,b) => (a-b);

//     console.log(calculadora(2,3,suma));
//     console.log(calculadora(2,3,resta)); */

// // function potencia(x,n){

// //     console.log(Math.pow(x,n));
// //     }
// //     potencia(2,7);


// // function potencia_recursiva(x,n){
// //     if(n ==1){
// //         return x;

// //     }else {
// //         return (x*potencia_recursiva(x,n-1));
// //     }
// // }
// // potencia_recursiva(2,3);

// // //1º Iteracion
// // x = 2; n = 3;
// // return 2 * potencia_recursiva(2^2);
// // //2º Iteracion
// // x = 2, n=2;

// // return 2* potencia_recursiva(2^1);
// // return 2*2;
// // //3º Iteracion

// // x = 2, n =1;
// // return 2;

// // function sumarTodo(...numeros){
// //     let acumulado = 0;
// //     for(let num of numeros){
// //         acumulado+= num;
// //     }
// //     return (acumulado);
// // }

// // console.log(sumarTodo(1,2,7,100,200,60));
// //fuyncion que le pases un numero de palabra variable y las concatene

// // function concatenar(...palabras){
// //     let concatenacion = " ";
// //     for(let palabra of palabras){
// //         concatenacion += palabra + " ";
// //     }
// //     return concatenacion;
// // }
// // console.log(concatenar("hola" , "adios" , "hasta" , "luego" , "pepe"));

// //funcion resstatotal rescursiva

// // function restaTotal(total,...numeros){

// //     if(numeros.length === 0){
// //         return total;
// //     }
// //      numero = numeros.pop();
// //     console.log(numero);
// //     return (restaTotal(total - numero,...numeros));

// // }


// // // metodo pop
// // let numeroinicial = 1000;
// // let resultado = restaTotal(numeroinicial, 12, 20, 79, 100);
// // console.log(resultado); // Imprime el resultado de las restas

// // function externa (){

// //     console.log("externa");

// //     function interna (){
// //         console.log("interna");
// //     }

// //     interna();
// // }
// // externa();

// // (function  () { console.log("hola alumnos")} ());

// // let nombre = "manolo";

// // function saludar(){
// //     let nombre = "pepe";
// //     return function(){
// //         console.log(nombre);
// //     }
// // }

// // saludar()();