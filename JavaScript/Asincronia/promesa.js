// document.querySelector('button').addEventListener('click', ()=>{
//     fetch("https://api.chucknorris.io/jokes/random")
//         .then(response=>response.json())
//         if (!response.ok){
//             throw new Error('No se pudo obtener la broma');
//         }
//         return response.json();
//     })
//     .then(data=>{
//         console.log(data.value);
//         const parrafo = document.createElement('p');
//         parrafo.innerText = data.value;
//         document.body.append(parrafo);
//     })
//     .catch(error=>{
//         console.error('Error:', error);
//     }) 

document.querySelector('button').addEventListener('click', async()=>{
    const respuesta = await fetch("https://api.api-ninjas.com/v1/quotes");
    if (respuesta.ok){
        const data = await respuesta.json();
        console.log(data);
        const parrafo = document.createElement('p');
        parrafo.innerText = data.value;
        document.body.append(parrafo);
    }else{
        throw new Error('No se pudo conectar al servidor');
    }
});

async function conexion(){
    let respuesta = await fetch("https://api.api-ninjas.com/v1/quotes", {
    method: 'GET',
    headers: {
        'X-Api-Key': 'ZSPtvG2ptJyOGUJauMaMzg==aXQR9qQ1ew0ReTOh'
    }
});
}


///////////////////////////
// const imagen1 = "https://via.placeholder.com/150";
// const imagen2 = "https://via.placeholder.com/300";
// const imagen3 = "https://via.placeholder.com/450";

// promesa1=cargarImagen(imagen1);
// promesa2=cargarImagen(imagen2);
// promesa3=cargarImagen(imagen3);

// function cargarImagen(url){
//     return new Promise((resolve, reject)=>{
//         const imagen = new Image();
//         imagen.src=url;
//         imagen.onload=()=>resolve(imagen);
//         imagen.onerror=(error)=>reject(error);
//     });
// }


// Promise.all([promesa1, promesa2, promesa3])
//     .then(imagenes=>{
//         for (const imagen of imagenes){
//             document.body.append(imagen);
//         }
//     })
//     .catch(error=>{
//         console.error('Error:', error);
//     });

const imagen1 = "https://cataas.com/cat?${Math.random()}";
const imagen2 = "https://cataas.com/cat${Math.random()}";
const imagen3 = "https://cataas.com/cat";

promesa1=cargarImagen(imagen1);
promesa2=cargarImagen(imagen2);
promesa3=cargarImagen(imagen3);

function cargarImagen(url){
    return new Promise((resolve, reject)=>{
        const imagen = new Image();
        imagen.src=url;
        imagen.onload=()=>resolve(imagen);
        imagen.onerror=(error)=>reject("error");
    });
}

document.getElementById('boton').addEventListener('click', async()=>{
    const imagenes = await Promise.all([promesa1, promesa2, promesa3]);
    imagenes.forEach(imagen => {
        document.body.append(imagen);
    });
});