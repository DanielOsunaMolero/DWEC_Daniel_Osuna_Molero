//1.Explain each otuput of the following code
console.log( null || 2 || undefined ); // null y undefinned son valores falsos por lo que solo dvuelve el 2 que es verdadero
console.log( 1 && null && 2 );// con el && se devuelve el primer valor falso que encuentra en la expresion
console.log( null || 2 && 3 || 4 );// el operador AND tiene ams preferencia que el OR asi que devuelve el ultimo valor de esta operacion que en este caso es 3
let x = 3;
console.log((x < 5) && (x > 0));//Si las dos expresiones son verdad devuelve true como es este caso
console.log((x < 5) && (x > 6));//Una de las dos expresiones es falsa asi que como resutado es false 
console.log((x > 2) || (x > 5));//Con el OR con que una de las dos sea cierta da el valor true (la primera es true)
console.log((x > 3) || (x < 0));//Ninguna de las dos es verdadera por lo que el resultad es false.
console.log(!(x == 3));// x==3 es true pero como tiene una negacion delante se convierte en un false
console.log(!(x < 2));// x<2 es false pero como tiene una negacion delante se convierte en true

//2.Change the code inside console.log so output is true
const numOne = 5;
const numTwo = 6;
console.log(numOne +1 == numTwo);
//Sumandole 1 a numOne se cumple la condicion de que sean iguales por lo que el output seria true

//3.Ask user for his age and check that it is not between 14 and 90 inclusively. Create two
//variants: the first one using NOT !, the second one – without it.
let age = prompt("¿Cual es tu edad?");

if (!(age >= 14 && age <= 90)) {
  console.log("Tu edad no esta entre 14 y 90.");
} else {
  console.log("Tu edad esta entre 14 y 90.");
}

let age1 = prompt("¿Cual es tu edad?");

if (age1 >= 14 && age1 <= 90) {
  console.log("Tu edad esta entre 14 y 90.");
} else {
  console.log("Tu edad no esta entre 14 y 90.");
}

//4. Explain what result will produce the following code
console.log(-1 || 0) && ( 'first' ); //El operando OR devuelve el primer valor verdadero y despues el operador AND devuelve el primer valor falso y si no hay ninnguno devuelve el ultimo
console.log(-1 && 0) || ( 'second' ); // -1 && 0 devuelve 0 ya que es el primer valor falso y despues devuelve second como valor verdadero
console.log(null || -1 && 1) && ( 'third' );