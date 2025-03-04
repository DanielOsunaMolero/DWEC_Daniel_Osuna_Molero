
const apiKey = "";
const apiUrl = "https://api.thedogapi.com/v1/images/search";

let currentPage = 1;
let loading = false;
let container;

document.addEventListener("DOMContentLoaded", () => {
    container = document.getElementById("card-container");

    if (!container) {
        console.error("Error");
        return;
    }

    fetchDogs();
});

async function fetchDogs() {
    if (loading) return;
    loading = true;

    try {


        const response = await fetch(`${apiUrl}?limit=8&page=${currentPage}`, {
            method: "GET",
            headers: {
                "x-api-key": apiKey
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }

        const data = await response.json();


        displayDogs(data);
        currentPage++;

    } catch (error) {
        console.error("Error al obtener imágenes:", error);
    } finally {
        loading = false;
    }
}

function displayDogs(dogs) {
    const container = document.getElementById("card-container");

    if (!container) {
        console.error("Error: No se encontró el contenedor 'card-container' en el HTML.");
        return;
    }

    dogs.forEach(dog => {
        const card = document.createElement("div");
        card.className = `relative bg-gradient-to-r from-blue-900 via-purple-800 to-indigo-900 
                          text-white p-6 shadow-xl rounded-xl border border-cyan-400 
                          transform transition duration-300 hover:scale-105 
                          hover:shadow-cyan-400/50 hover:border-cyan-300 
                          w-80 h-auto flex flex-col items-center text-center overflow-hidden`;

        card.innerHTML = `
            <div class="absolute top-0 left-0 w-full h-1 bg-cyan-400"></div>

            <img src="${dog.url}" 
                 alt="Dog" 
                 class="w-64 h-64 object-cover rounded-lg border-4 border-cyan-300 shadow-md mt-3">
            
            <h2 class="text-2xl font-bold">ID: ${dog.id}</h2>
            
            <p class="text-md text-gray-200"> ${dog.width}px x ${dog.height}px</p>

            <div class="absolute bottom-0 left-0 w-full h-1 bg-cyan-400"></div>
        `;

        container.appendChild(card);
    });
}



