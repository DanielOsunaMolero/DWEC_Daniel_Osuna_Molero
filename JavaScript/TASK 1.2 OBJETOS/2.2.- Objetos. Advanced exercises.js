//1.- Estableciendo el Contexto
//Ejercicio 1. Dado un objeto con un método greet, crea otro objeto y usa el método greet del primer objeto con él.
const obj1 = {
    greet: function() {
        console.log("Hola desde obj1!");
    }
};
const obj2 ={};
obj1.greet.call(obj2); // Usamos el método greet de obj1 con obj2

//Ejercicio 2. Crea una función que acepte un objeto como argumento y le agregue una nueva propiedad. Usa call para ejecutar la función con diferentes objetos.
function addProperty(property, value) {
    this[property] = value;
}
const objectA = {};
const objectB = {};
addProperty.call(objectA, "newProp", "Valor A");
addProperty.call(objectB, "newProp", "Valor B");
console.log(objectA); // { newProp: "Valor A" }
console.log(objectB); // { newProp: "Valor B" }

//Ejercicio 3. Define un objeto con un método describe. Crea otro objeto y usa bind para enlazar el método describe al nuevo objeto.
const describe = {
    describe() {
        console.log(`Este es un objeto con propiedades`);
    }
};
const otroobjeto = { name: "Objeto Otro" }; //creamos otro objeto
const boundDescribe = describe.describe.bind(anotherObject); //enlazamos con el otro objeto
boundDescribe(); // Describe las propiedades del nuevo objeto anotherObject
//Ejercicio 4. Escribe una función que registre los valores de las propiedades de un objeto. Usa bind para crear una nueva función con un contexto predefinido para este registro.
function registrarvalor(){

    console.log(Object.values(this).join(", "));
}

//2.- Encapsulamiento (Propiedades Privadas y Getters/Setters)
//Ejercicio 5. Crea una función constructora que inicialice las propiedades privadas _name y _age. Agrega getters y setters públicos para acceder y modificarlos.
function persona(name, age) {
    let _name = name;
    let _age = age;

    this.getName = function () {
        return _name;
    };
    this.getAge = function () {
        return _age;
    };
    this.setName = function (newName) {
        _name = newName;
    };
    this.setAge = function (newAge) {
        if (newAge > 0) {
            _age = newAge;
        }

    }
}
//Ejercicio 6. Define una clase que tenga una propiedad privada _balance. Agrega un método para incrementar el balance y otro para recuperarlo.
class cuenta{
    #balance = 0;
    depositar(cantidad){
        if(cantidad>0){
            this.#balance+=cantidad;
        }
    }

    getBalance(){
        return this.#balance;
    }
}
const micuenta= new cuenta();
micuenta.depositar(700);
console.log(micuenta.getBalance());
//Ejercicio 7. Crea una función constructora para un objeto con una propiedad privada _score. Agrega un getter que devuelva el puntaje y un setter que lo actualice solo si es mayor que el puntaje anterior.

// function funcion12(){
//     this.score = 0;

//     this.getscore=function(){
//         return this.score;
//     }

//     this.setscore = function(score2){
//         if(this.score > score2){
//             this.score=score2;
//         }
//     }
// }
//Ejercicio 8. Define una clase con una propiedad privada _password. Agrega un setter que permita actualizar la contraseña solo si se cumple una condición (por ejemplo, longitud mínima).

class usuario{

    #password ="";

    setpassword(newpassword){
        if(newpassword.length> 10){ //10 es el minimo
            this.#password = newpassword;
        }else{
            console.log("debe tener mas de 10 caracteres")
        }
    }

    getPassword(){
        return this.#password;
    }
}
//3.- Herencia
//Ejercicio 9. Define una clase base Person con un método greet. Crea una clase Student que herede de Person y agregue un método study.
//Ejercicio 10. Crea una clase base Vehicle con un método drive. Define una subclase Car que herede de Vehicle y agregue un método accelerate.
//Ejercicio 11. Escribe una clase Product con un método displayInfo. Crea una subclase Book que herede de Product y agregue una propiedad author.
//Ejercicio 12. Define una clase Device con un método turnOn. Crea una clase Smartphone que herede de Device y agregue un método call.

//4.- Sobrescritura
//Ejercicio 13. Define una clase Person con un método greet. Crea una clase Friend que sobrescriba greet para proporcionar un saludo personalizado.
//Ejercicio 14. Crea una clase Shape con un método draw. Define una clase Circle que sobrescriba el método draw con un mensaje específico para círculos.
//Ejercicio 15. Define una clase Player con un método play. Crea una subclase Musician que sobrescriba play para especificar el instrumento que se toca.
//Ejercicio 16. Escribe una clase Machine con un método start. Crea una subclase Car que sobrescriba start para agregar un mensaje sobre el tipo de motor.

//5.- Desestructuración
//Ejercicio 17. Dado un objeto con las propiedades title, author y year, desestructúralo para extraer estos valores y registrarlos.
//Ejercicio 18. Desestructura un array con tres elementos y asígnalos a variables individuales, luego registra los valores.
//Ejercicio 19. Crea una función que tome un objeto con las propiedades name, age y country, y desestructúralos directamente en la lista de parámetros.
//Ejercicio 20. Dado un objeto anidado con las propiedades user y address, desestructúralo para extraer userName y city.

//6.- Encadenamiento Opcional (?.)
//Ejercicio 21. Crea un objeto con una propiedad user que contenga propiedades anidadas. Usa el encadenamiento opcional para acceder a una propiedad inexistente sin causar error.
const objeto = {
    user: {
        name: "Juan",
        address: {
            city: "Madrid",
            zip: "28001"
        }
    }
};

// Usando encadenamiento opcional para acceder a una propiedad inexistente
console.log(objeto.user?.address?.country);  

//Ejercicio 22. Dado un objeto book con una propiedad author, usa el encadenamiento opcional para acceder a authorName. Intenta acceder a una propiedad que no exista, verificando que devuelva undefined.
class Author {
    constructor(authorName) {
        this.authorName = authorName;
    }
}

class Book {
    constructor(title, author) {
        this.title = title;
        this.author = author;
    }
}
console.log(Book.author?.authorName);

console.log(book.author?.fechadenacimiento); 
//Ejercicio 23. Crea un objeto shop con propiedades de producto anidadas. Usa el encadenamiento opcional para acceder al precio de un producto que no exista, asegurando que devuelva undefined.
class Product {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }
}

class Shop {
    constructor(products) {
        this.products = products;
    }
}
const shop = new Shop({
    apple: new Product("Apple", 1.5),
    banana: new Product("Banana", 0.8)
});
console.log(Shop?.Products?.orange?.price);//dara undefined
//Ejercicio 24. Define un objeto con propiedades que representen una película y un director. Usa el encadenamiento opcional para acceder al nombre del director y a una propiedad inexistente.
class Director {
    constructor(name) {
        this.name = name;
    }
}

class Movie {
    constructor(title, director) {
        this.title = title;
        this.director = director;
    }
}

const movie = new Movie("Inception", new Director("Christopher Nolan"));

// Accediendo al nombre del director
console.log(movie.director?.name); // Christopher Nolan

// Accediendo a una propiedad inexistente
console.log(movie.director?.awards); // undefined
