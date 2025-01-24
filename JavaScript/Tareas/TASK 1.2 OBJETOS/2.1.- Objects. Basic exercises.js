// Exercises on Objects in JavaScript

// Exercise 1: Create an object with properties that describe a car (brand, model, year).
function car (brand,model,year){
    this.brand= brand;
    this.model=model;
    this.year = year;
};
// Exercise 2: Create a constructor function for a Person and instantiate two objects from it.
function persona(nombre,edad){
    this.nombre = nombre;
    this.edad=edad;
}
persona1 = new persona("pepe",12);
persona2 = new persona("antonio",13);
// Exercise 3: Access properties of a book object using both dot notation and bracket notation.
function book(numeropaginas,titulo,yearpublished){
    this.numeropaginas=numeropaginas;
    this.titulo=titulo;
    this.yearpublished=yearpublished;
}
book1 = new book(9,"el resplandor",2001);

console.log(book1.titulo);

// Exercise 4: Modify the year published property of the book object.
console.log("antes de cambiar "+book1.yearpublished);
book1.yearpublished =2009;
console.log("despues de cambiar "+ book1.yearpublished);
// Exercise 5: Add a new property (color) to the car object.
car.prototype.color = null;

// Exercise 6: Remove the model property from the car object.
delete car.color;
// Exercise 7: Create an object and freeze it. Try to change one of its properties.
//  car2= new car("peugeot",207,2020);
//  car2.freeze(brand);

//  console.log(car2.brand);
//  car2.brand ="seat";
//  console.log(car2.brand);
// Exercise 8: Create an object and prevent it from having new properties added. Try to add a new property.
const silla={
     patas: 4,
     marca: "hermanmiller"

}

// silla.prototype.color= null;
// Exercise 9: Use Object.keys() to get the keys of a student object and print them.
function estudiante(nombre,edad){
    this.nombre=nombre;
    this.edad=edad;
}
estudiante1= new estudiante("daniel",22);
console.log(Object.keys(estudiante1));




// Exercise 10: Use Object.values() to get the values of a student object and print them.

console.log(Object.values(estudiante1));
// Exercise 11: Iterate through the properties of a pet object and print each property with its value.

// Define the pet object
const pet = {
    name: "Buddy",
    type: "Dog",
    age: 5,
    breed: "Golden Retriever"
};

// Iterate through each property and print it with its value
for (const key in pet) {
    console.log(`${key}: ${pet[key]}`);
}

// Exercise 12: Write a function that checks if two objects have at least one property in common.

const car3 = new car("citroen","polo",2007);
const car4 = new car("tesla","cybertruck",2007);

function propiedadEnComun(obj1, obj2) {
    for (const key in obj1) {
        if (obj1[key] === obj2[key]) {
            return true;
        }
    }
    return false;
}

console.log(propiedadEnComun(car3,car4));
// Exercise 13: Create a function that returns a new object that merges two given objects.
// Exercise 14: Create a function that clones a given object.
// Exercise 15: Create a function that compares two objects and returns true if they are equal, false otherwise.
// Exercise 16: Write a function that destructures an object and returns its properties as variables.
// Exercise 17: Create an object that uses 'this' in a method and show how to call it correctly.
