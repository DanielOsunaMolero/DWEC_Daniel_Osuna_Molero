// /*
//  * 
//  * predecibles
//  * impredecibles
//  * 
//  * 
//  * 
//  * formas de manejar erroes
//  *  -if --> predecibles
//  *  -try-catch 
//  * 
//  * cuando se usaria un if?
//  *  -predecibles
//  *  -elegir si quiero interrumpir el flujo o no
//  *  
//  * cuando se usaria un try-catch?
//  *      -impredecibles
//  *      -quiero que la ejecucion del codigo se interrumpa para tratar el error
//  * 
//  * try{
//  *  condicion
//  * }catch (error){
//  *      console.log(error.)
//  * }finally{
//  *  siempre se ejecuta
//  * }
//  * 
//  */

// function dividir(num1, num2){
//     if(num2 !=0){
//         let resultado = num1/num2;
//         return resultado;

//     }else{
//         console.log("no puedo hacer la operacion");

//     }

// }   

// try{
//     funcionQueNoExiste();
// }catch(error){
//     console.log(error.name , error.message,error.stack);
// }finally{
//     console.log("siempre se ejecuta");
// }


// function conectarServidor(){

//     try{
//         const servidorEncendido=false;
//         if(!servidorEncendido){
//             throw new Error("servidor apagado");
//         }
//     }catch(error){
//         console.log(error.message);
//     }
// }

// function iniciarConexion(){
//     try{
//         conectarServidor();
//     }catch(error){
//         console.log(error.message);
//     }
// }

// iniciarConexion();

// //where to handle errors
// /*
// 1. dentro de la funcion donde se puedan producir
// 2. a la 1 le añado  el codigo donde se llama a al codigo que puede producir el error
// 3. solo en el codigo donde se puede producir el error
// 4. meter gran parte del codigo en un try-catch
// */

// function obtenerPropiedad(objeto, propiedad){

//     try{
//         return objeto.proiedad;
//     }catch(error){
//         console.log(error.stack);

//     }
// }

// function procesarNombre(nombre){
//     try{

//         return nombre.lenght;

//     }catch(error){
//         console.log(error.stack);
//     }
// }

// function procesarDatos(objeto){

//     let usuario= obtenerPropiedad(objeto, "nombre");
//     let nombre= procesarNombre(usuario);
// }

// let usuario ={nombre:"perico"};
// procesarDatos(usuario);

// //lanzar errores personalizados

// //normalmenter js detecta un error y lo lanza´
// /*
//     SyntaxError
//     ReferenceError
//     TypeError
// */

// function dividir(num1, num2){
//     if(num2 ==0){
//         throw new Error("No se puede dividir por 0");

//     }else{
//         return num1/num2;
//     }

// }

// function procesar(datos){
//     try{
//         let usuario = JSON.parse(datos);
//         if(!usuario.direccion){
//             throw new SyntaxError("no se ha encontrado la direccion");
//         }
//     }catch(error){
//         console.log(error.name, error.message);

//     }
// }

//debugging


function suma(a,b){
    return a+b;
}

function factorial(n){

    if(n==0) return 1;
    return n*factorial (n-1);
    
}

console.log("estoy sumando", suma(2,3));

console.log(factorial(10));