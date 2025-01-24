// // let m1 = ["espaguetis","macarrones", "pizza"];
// // let m2 = [true , 25, "mangos" , function(){console.log("hola");}];

// // let mb1 = [
// //     ["espaguetis","macarrones", "pizza"],
// //     ["tortilla", "kebab", "montadito"],
// //     [true ,false]
// // ];

// // let matrizObjetos =[
// // {nombre: "pepe" , edad :25},
// // {nombre: "lucia" , edad : 25},
// // {nombre: "pepe" , edad : 25},


// // ];

// // let matriz4 =  new Array(1,2,3);
// // let matriz5 =  new Array(5);
// // let matriz6 =  new Array(
// //     new Array(1,2,3),
// //     new Array(true , false),
// //     new Array(()=>console.log("hola"),()=>console.log("adios"))
// // );

// // //accesing
// // console.log(m1[0],mb1[0][1]);

// //  let arr1=[1,2,3];
// // console.log(typeof(arr1));
// // console.log (Array.isArray(arr1));

// // let frutas = ["mango" , " aguacate", "chirimoya", "manzana" , "pera"];
// // console.log(frutas.indexOf("pera"),frutas.includes("naranja"));
// // frutas.lastIndexOf("pera");
// // let frutas2 = frutas.splice(1,3); //splice extrae de otro array de la posicion 1 a la 3 por ejemplo
// // console.log(frutas, frutas2);

// // frutas.splice(3,0 ,"sandia","melon");
// // console.log(frutas);

// //slice : devuelve pero sin modificar la matriz origina

// // let frutas2 =  frutas.slice(1,3);
// // //let arr2 = [1,2,3];
// // console.log(frutas,frutas2);

// //comparar matrices
// let arr1 = [1,[2,3]];
// //let arr2 = arr1;
// //let arr2 = [1,2,3];
// let arr3 = [1,2,4];
// // console.log(arr1 == arr2);

// // arr2 = [4,5,6];

// // let var1 = "123";
// // let var2=var1;
// // console.log(var1, var2 , var1==var2);
// // var2 = "321";
// // console.log(var1,var2);


// // console.log(JSON.stringify(arr1)==JSON.stringify(arr3));

// // const arr4 =[1, "hola" ,function(){return "hola"}];
// // const arr5 = [];

// // let mat1 = [1,2,3,4,5,20,20,20];
// // console.log(mat1.map(x =>x*3),mat1);
// // console.log(mat1.reduce((total,actual)=>total+actual));
// // mat1.filter(elemento=>elemento>10).reduce((total,actual)=>total+actual);

// //convertir una matriz

// let mat1 = ["gato" , "perro" , "huron" , "serpiente"];
// console.log(mat1.join());// coonvierte a una cadena de texto

// //sorting ordenando

// let mat2 = [4,25,17,1,4,2,29];
// console.log(mat2.sort());

// //reverse darle la vuelta
// console.log(mat2.reverse());

// //rellenar arrays
// let mat3 = new Array(5);
// mat3.fill(0);//rellena todo de 0

// console.log(mat3.fill(-5,1,3));