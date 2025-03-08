const apiKey = "";  // Tu API Key
const apiUrl = "https://api.thedogapi.com/v1/images/search";

let currentPage = 1;
let loading = false;  // Estado para evitar múltiples llamadas
let container;

document.addEventListener("DOMContentLoaded", () => {
    container = document.getElementById("card-container");

    if (!container) {
        console.error("Error: No se encontró el contenedor 'card-container'.");
        return;
    }

    fetchDogs(); // Cargar los primeros perros
});

async function fetchDogs() {
    if (loading) return;  // Evitar llamadas simultáneas
    loading = true;

    try {
        console.log(`🔄 Cargando imágenes (Página ${currentPage})...`);

        const response = await fetch(`${apiUrl}?limit=14&page=${currentPage}`, {
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
        loading = false; // Se libera el estado de carga
    }
}

function displayDogs(dogs) {
    if (!container) return;

    dogs.forEach(dog => {
        const card = document.createElement("article");
        card.className = `
            relative bg-gradient-to-r from-blue-900 via-purple-800 to-indigo-900 
            text-white p-4 shadow-lg rounded-xl border border-cyan-400 
            transform transition duration-300 hover:scale-105 hover:shadow-cyan-400/50 
            hover:border-cyan-300 w-full max-w-xs flex flex-col items-center text-center overflow-hidden
        `;

        card.innerHTML = `
            <div class="absolute top-0 left-0 w-full h-1 bg-cyan-400"></div>

            <img src="${dog.url}" 
                 alt="Dog Image" 
                 class="w-full h-48 object-cover rounded-lg border-4 border-cyan-300 shadow-md mt-3">
            
            <h2 class="text-xl font-bold mt-2">ID: ${dog.id}</h2>
            
            <p class="text-sm text-gray-300"> ${dog.width}px x ${dog.height}px</p>

            <div class="absolute bottom-0 left-0 w-full h-1 bg-cyan-400"></div>
        `;

        container.appendChild(card);
    });
}