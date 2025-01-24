// let persona ={};
// let persona2 ={
//     nombre: "procopio" ,
//     edad: 27
// }

// let persona3 ={
//     nombre : "apolinar",
//     edad: 44,
//     saluda:function(){
//         console.log("hola");

        
//     },
//     despidete(texto){
//         console.log(texto);
//      },

//      pregunta:(texto) => {console.log(texto)}

// }

// //with a constructor

// function Perro(tipo,nombre){
//     this.nombre = nombre;
//     this.tipo = tipo;
//     this.ladrar = function(){
//         console.log("guau");
//     }
// }

// new miPerro = new Perro("foxterrier","perico");

// const{raza,...otros}={

//     raza:"podenco",
//     edad: 5, 
//     peso:15

// }

//factoty function

// function construyeAnimal(nombre , edad){
//     return{
//         nombre: nombre,
//         edad: edad

//     };
// }

// let miAnimal=construyeAnimal("perico",3);
// console.log(miAnimal);
// //create a nother way of doing the same
// let crearAnimal = (nombre,edad)=>{
//     {nombre,edad}
// };

// let miAnimal2=crearAnimal("fufo",5);
// console.log(miAnimal2);

// //access obbjetos propierties
// //using a dot

// console.log(persona2.nombre);
// console.log(persona3.saluda);
// //añadiendo mas propiedades despues de que el objeto haya sido creado

// console.log(persona);
// persona.nombre="hilario";
// persona["direccion completa"] = "calle pez","nº3";
// console.log(persona);

// Object.defineProperty(persona,'profesion',{
//     value: function(texto){
//         console.log(texto)
//     },
//     writable: false,  //no puede cambiar el valor
//     enumerable: false, //no puede ser iterado
//     configurable: false, //no puede ser borrado
// });

// // console.log(persona.profesion);

// Object.seal(persona);
// Object.preventExtensions(persona);//no te deja crear atributos nuevos

//objet create
//literal object
// const persona = {

//     nombre : "procopio",
//     edad: 30,
//     habla(texto){
//         console.log(texto);
//     }
// }

// console.log(persona.nombre);
// persona.habla("hola como estas");


//opcion 1 duplicate code
//opcion 2 object.assign


// const persona = {

//     nombre : "procopio",
//     edad: 30,
//     habla(texto){
//         console.log(texto);
//     }
// };

// const persona1 = Object.assign({},persona);
// const persona2 =Object.assign({} , persona);
// persona1.habla("soy la persona 1");
// persona1.nombre = "Urraca";
// persona2.habla("soy la persona 2");
// persona2.nombre="Ursula";

//inheritance
//problem: duplicate code in memory
//opcion 3 : object.create()

// const persona = {

//     nombre : "procopio",
//     edad: 30,
//     direccion:{
//         calle :"pez",
//         numero: 3
//     },
//     habla(texto){
//         console.log(texto);
//     }
// };

// const persona1 = Object.create(persona);
// const persona2 =Object.create(persona);
// persona1.habla("soy la persona 1");
// persona1.nombre = "Urraca";
// persona2.habla("soy la persona 2");
// persona2.nombre="Ursula";

//advantage over object assign -> it allows sharing methods in memory. 
//Objects dont have their own copy of methods


//2nd way of creating objects

// const crearCoche = (marca, modelo) => {
//     return {
//         marca,
//         modelo,
//         acelerar() {
//             console.log("acelerando");
//         }

//     };
// };

// const coche1 =  crearCoche("ford", "escort");
// const coche2 =  crearCoche("volswawen", "golf");
//problemm it doenst allow inheritance . Besides methods are copied at every objects

//3rd wayr of creating objects
//constructor funcion
 
// function Coche(marca, modelo) {
//     this.marca = marca;
//     this.modelo = modelo;
//     this.acelerar = acelerar() = function () {
//         console.log('soy ${this.marca} y estoy acelerando');

//     };
// };

// const coche1 = new Coche("ford", escort);
// const coche2 = new Coche("volswawen", "golf");

//prototype -> prototypical inhertance

// function Coche(marca, modelo) {
//     this.marca = marca;
//     this.modelo = modelo;

    
// };

// Coche.prototype.acelerar =  function(){
//      console.log('soy ${this.marca} y estoy acelerando');
// }

// const coche1 = new Coche("ford", escort);
// const coche2 = new Coche("volswawen", "golf");

//4th way of creating objects

// class Coche{
//     constructor(marca,modelo){
//         this.marca = marca;
//         this.modelo = modelo;
//     }

// }

// const coche1 = new Coche("ford", escort);
// const coche2 = new Coche("volswawen", "golf");


//create, assign
//hasOwnProperty , hasOwn , in
// const objeto = { a: 1 };
// console.log(objeto.hasOwnProperty('a')); // true, heredado de Object

// const objetoHeredado = Object.create(objeto);
// objetoHeredado.b = 2;

// Object.defineProperty(objetoHeredado, 'c', {
//     value: 3,
//     writable: false,
//     enumerable: true,
//     configurable: true
// });

// console.log(objetoHeredado.hasOwnProperty('c')); // true

// // ES13 ECMAScript 2022
// console.log(Object.hasOwn(objeto, 'a')); // true
// console.log(Object.hasOwn(objetoHeredado, 'a')); // false, 'a' está en la cadena de prototipos
// console.log(Object.hasOwn(objetoHeredado, 'b')); // true
// console.log('a' in objetoHeredado); // true, ya que 'a' está en la cadena de prototipos

// // DEFINE PROPERTY IN PROTOTYPE
// function Persona(nombre, edad) {
//     this.nombre = nombre;
//     this.edad = edad;
// }

// const persona1 = new Persona('Sisebuto', 30);

// Object.defineProperty(Persona.prototype, 'saludar', {
//     value: function() {
//         console.log(`hola soy ${this.nombre}`);
//     },
//     writable: true,
//     enumerable: false,
//     configurable: false
// });

// persona1.saludar(); // "hola soy Sisebuto"


//copy nested propertiesz
// const persona={
//     nombre:"recaredo",
//     profesion: "rey godo",
//     medidas:{
//         altura:180,
//         peso:80
//     }
// }
// let persona2 =structuredClone(persona);



// //const persona2 = Object.assign({}, persona);    
// persona.nombre= "recadera";
// console.log(persona.nombre , persona2.nombre);
// persona2.medidas.altura=190;
// console.log(persona.medidas.altura , persona2.medidas.altura);

//deep copy

// let var1 = var2= 5;
// var3 =3;
// console.log(var1,var2);


// let persona1 = persona2={
//     nombre: "sisebuto",
//     edad: 30
// };
// persona2.nombre="benancio";

// let persona3 ={
//     nombre: "sisebuto",
//     edd: 30
// };
// console.log(persona1.nombre,persona2.nombre);
// console.log(persona1= persona3);

// function Persona(nombre, edad){
//     this.nombre= nombre;
//     this.edad=edad;

// }
// Persona.prototype.saludar= function(){
//     console.log(`hola soy ${this.nombre}`);
// }

// const persona1 =  new Persona();
// persona1.saludar();

// function Producto(nombre , precio){
//     this.nombre = nombre;
//     this.precio =  precio;
//     this.descontar= function(Producto, porcentaje){
//         const descuento = Producto.precio*(porcentaje/100);
//         console.log(descuento);
//     }
// }

// const producto1 = new Producto("zapatos",120);
// producto1.descontar();  

// function multiplicar(a,b){
//     return a*b;

// }
// const duplicar= multiplicar.bind(null,2);
// duplicar(5);
// duplicar(18);

// const persona={
//     nombre : "procopio",
//     edad: 30,
//     saludar:function(){
//         console.log(`Hola soy ${this.nombre}`);
//     }
// }

// persona.saludar();
// const saludarFuera= persona.saludar;
// saludarFuera();

// const saludarConBind= persona.saludar.bind(persona);

// saludarConBind();

//CALL (APPLY)

// const persona={
//     nombre : "procopio",
//     edad: 30,
    
// }

// function saludar(){
//     console.log(`${this.nombre} te saluda`);
// }
// persona.saludar();
// //persona.tesaludo= saludar(); NO
// saludar.call(persona);

// function persona(nombre,edad){
//     this.nombre= nombre;
//     this.edad =  edad;

// }
// Object.defineProperty(persona.prototype,'saludar', {
//     value: function(){
//         console.log(`${this.nombre} te saluda`);
//     },
//     writable: true,
//     enumerable: false,
//     configurable : false
// })

// const persona1 =  new persona("demetrio",27);
// persona1.saludar();

// persona.prototype.saludar.call(persona1);

//DIA 7 NOVIEMBRE
// function persona(nombre,edad){
//     this.nombre= nombre;
//     this.edad =  edad;

// }
// Object.defineProperty(persona.prototype,'saludar'),{
//     value:function(){
//         console.log(`hola soy ${this.nombre}`)
//     },
//     writable: true,
//     enumerable: false,
//     configurable:false

// }

// const persona1 = new persona("Sisebuto",22);
// persona1.saludar();

// persona.prototype.saludar.call(persona1);

// const obj1 ={nombre:"nepumoceno"};
// const obj2 ={nombre:"servanda"};
// function saludar(){
//     console.log(`hola soy ${this.nombre}`)
// }
// saludar.call(obj1);

// let persona ={
//     _nombre:"",
//     _apellidos:"",


// get nombre(){
//      console.log(this._nombre);
// },

// set nombre(nombre){
//     this._nombre= nombre;
// },

// get apellidos(){
//     console.log(this._apellidos);
// },

// set apellidos(apellidos){
//    this._apellidos= apellidos;
// }
// }

// let persona1= Object.create(persona);
// persona1.nombre="felipe";
// console.log(persona1.nombre);

// function Animal(nombre){
//  this.nombre= nombre;
// this.hacerSonido=()=>{
//     console.log(`${this.nombre} esta haciendo un sonido`)
// }

// this.comer= function(){
//     console.log(`${this.nombre} esta comiendo`)
// }
// }

// Animal.prototype.hacerSonido=()=>{
//     console.log(`${this.nombre} esta haciendo un sonido`)
// }

// Animal.prototype.come=()=>{
//     console.log(`${this.nombre} esta comiendo`)
// }

// Animal.prototype.duerme=function(){
//     const funcionDeFlecha=()=>{
//         console.log(`${this.nombre} esta durmiendo`)
//     }
//     funcionDeFlecha();
// }

// // const miAnimal = new Animal("Algodon");
// // miAnimal.hacerSonido();
// // miAnimal.comer();

// //ooverriding

// //lteral objects


// Animal.prototype.ruido=function(){
// console.log("estoy haciendo un ruido de animal");

// };

// function Gato(nombre){
//     Animal.call(this);
//     this.nombre=nombre;

// }

// //setprototypeOff cambia el prototipo sobre la marcha

// Gato.prototype=Object.create(Animal.prototype);
// Gato.prototype.constructor=Gato;

// Gato.prototype.ruido=function(){

//     console.log("estoy maullando");
// }

// const miGato = new Gato("tizon");
// miGato.ruido();



// class Animal{

    
//     constructor(nombre){
//         super();
//         this.nombre=nombre
//     }

//     getNombre(){
//         return this.nombre;
//     }
//     setNombre(newname){
//         this.nombre = newname;
//     }

//     comer(){

//     }
//     ruido(){
//         console.log("estoy haciendo un ruido de animal");
//     }
// }

// class Gato extends Animal{

//     constructor(nombre){
//         super();
//         this.nombre=nombre
//     }

//     getNombre(){
//         return this.nombre;
//     }
//     setNombre(newname){
//         this.nombre = newname;
//     }

//     ruido(){
//         super().ruido();
//         console.log("estoy maullando")
//     };
// }

//object operadores

// class Base {

//     constructor(){
//     this.contador = 0;
//     }

//     aumenta(){
//         this.contador++;
//     }
//     muestra(){
//         console.log(this.contador);
//     }


// }

// //mixing
// let mezcla = (claseBase) => class extends claseBase{
//     constructor(){
//         super();
//     }
//     disminuye(){
//         this.contador--;
//     }
// }

// class Heredada extends mezcla(Base){
//     reiniciar(){
//         this.contador=0;
//     }
// }

// let miClase =  new Heredada();

// miClase.muestra().aumenta().muestra();


//OBjeto number
let a= 5;
let numObj = new Number(5);
/*API

I can define properties
shared
there are predeined properties
*/

// console.log(Number.MAX_VALUE);
// console.log(Number.MIN_VALUE);
// console.log(Number.NaN);
// console.log(Number.POSITIVE_INFINITY);
// console.log(Number.MAX_SAFE_INTEGER);

// //Imprecise regarding number
// //FP DP --> 64 bits 1 sign , 11 exponente , 52 mantissa

// console.log(1e500);
// //BigInt --> primitive value
// console.log(9999999999999999999999);

// let sum = 0.1+0.2;
// console.log(sum);

const maximo = Number.MAX_SAFE_INTEGER;
const num1= maximo+1;
const num2= num1+1;
const num3= num2+1;

console.log(num1,num2,num3);
