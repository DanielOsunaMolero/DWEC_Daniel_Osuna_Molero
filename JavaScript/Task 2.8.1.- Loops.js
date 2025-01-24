//1. What is the last value output by this code? Why?
let i = 3;
while (i) {
 console.log( i-- );
}
console.log("__________________________________________________________________________________________");
//La ultima salida de este codigo es 1 ya que el bucle va decreciendo desde 3
//2. Rewrite the following code changing the for loop to while without altering its behavior
//(the output should stay same).
for (let i = 0; i < 3; i++) {
    console.log ( `number ${i}!` );
   }

   let e=0;
   while(e < 3){
    
    console.log ( `number ${e}!` );
    e++;
   }

//3. Write a loop which keeps prompting for a number until it is greater than 100 or enters an
//empty line.
let num;

while (true) {
  num = prompt("Dame un numero mayor que 100 o dejalo vacio");

  // If the user enters an empty line or cancels
  if (num === '' || num === null) {
    break;
  }

  // Convert input to a number and check if it's greater than 100
  if (Number(num) > 100) {
    console.log("Numero correcto mayor de 100.");
    break;
  } else {
    console.log("Please enter a number greater than 100.");
  }
}
//4. Using while loop, create two arrays: one with even numbers and another one with odds
//numbers. Both of them from 1 to n, being n a number provided by user. Using a for loop,
//create a third array whose nth number is the sum of nth number of both arrays.

let n = parseInt(prompt("Introduce un numero:"));
let pares =[];
let impares =[];
let s = 1;

while(i<=n){
  if(s%2 ==0){
    pares.push(s);
  }else{
    impares.push(s);
  }
  s++;
}
let length = Math.min(pares.length, impares.length);

let sumaarrays = [];
for (let j = 0; j < length; j++) {
  sumaArrays.push(pares[j] + impares[j]);
}
console.log("Array de pares:", pares);
console.log("Array de impares:", impares);
console.log("Array con la suma de pares e impares:", sumaArrays);