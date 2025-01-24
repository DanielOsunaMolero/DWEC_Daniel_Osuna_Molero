//1.What are the final values of all variables a, b, c and d after the code below?
let a = 1, b = 1;
let c = ++a; 
let d = b++; 
console.log(a); //a =2 ya que hay un sumatorio de a en la segunda linea
console.log(b); // b= 2 ya que hay un sumatorio de b en la segunda linea
console.log(c); // c = 2 ya que a se incrementa antes de asignarle valor
console.log(d); // d = 1 por que le das el valor de b antes de incrementarlo


//2.What are the values of y and x after the code below?
let y = 2;
let x = 1 + (y *= 2);
console.log(y); // y = 2 , no se modifica el valor de y
console.log(x); // x =5 --> 2*2+1


//3.What will be the result for these expressions?
console.log(5 > 4 ); // True : Simplemente 5 es mayor que 4
console.log("apple" > "pineapple");// Lsa palabras se miden por el valor de las letras y p es mayor que a por eso genera false
console.log("2" > "12"); //False : No esta comparando numeros por que estan entre comillas , esta comparando cadenas de texto
console.log(undefined == null);//True : Son considerados iguales con el doble operador ==
console.log(undefined === null);//False : Con la igualdad estricta salta false ya que son de diferente tipo 
console.log(null == "\n0\n");// False: En una comparacion de igualdad debil unicamente undefined es igual a null
console.log(null === +"\n0\n");// False: En una comparacion de igualdad fuerte y no son del mismo tipo number!=object
console.log("" + 1 + 0);// 10 : Los numeros se estan sumando a una cadena de texto
console.log("" - 1 + 0);// -1 : La cadena vacia se convierte en un 0 y se le resta el -1
console.log(true + false);// 1 : El true se convierte a 1 y el false a 0 --> 1+0 =1
console.log(6 / "3");// 2 : La cadena "3" se convierte en un numero
console.log("2" * "3"); // 6 : Las cadenas se convierten en numeros asi que --> 2*3=6
console.log(4 + 5 + "px");// 9px : Primero se suman los dos numeros que seria 9 y luego se le suma la cadena px
console.log("$" + 4 + 5); // $45 : Se concatenan las cadenas 
console.log("4" - 2);// La cadena "4" se convierte en número, por lo tanto, 4 - 2 = 2.
console.log("4px" - 2); // La cadena "4px" no se puede convertir en número, por lo tanto, el resultado es NaN (Not a Number).
console.log(" -9 " + 5);// La cadena " -9 " se concatena con el número 5, dando como resultado la cadena " -9 5".
console.log(" -9 " - 5);// La cadena " -9 " se convierte en el número -9, y luego se le resta 5, lo que da -14.
console.log(null + 1); // `null` se convierte a 0, por lo tanto, 0 + 1 = 1.
console.log(undefined + 1); // `undefined` no se puede convertir en número.
console.log(" \t \n" - 2); // La cadena solo contiene espacios en blanco, que se convierten a 0, por lo tanto, 0 - 2 = -2.

/* 5.Here’s a code that asks the user for two numbers and shows their sum. It works incorrectly.
The output in the example below is 12 (for default prompt values). Why? Fix it. The result
should be 3*/

/*let p = prompt("First number?", 1);
let o = prompt("Second number?", 2);
alert("p" + "o"); // 12*/ 

//Lo que funciona incorrectamente es que  se suman como cadenas de texto no se multiplican como nnumeros.
//Aqui esta el codigo arreglado
let p = prompt("First number?", 1);
let o = prompt("Second number?", 2);
let num1 = Number(p);
let num2 = Number(o);
alert(num1 + num2);