const apiKey = "";
const apiUrl = "https://api.thedogapi.com/v1/images/search";

let currentPage = 1;
let loading = false;

$(document).ready(function () {
    fetchDogs();

    // Evento de Infinite Scroll
    $(window).on("scroll", function () {
        if ($(window).scrollTop() + $(window).height() >= $(document).height() - 200) {
            fetchDogs();
        }
    });
});

async function fetchDogs() {
    if (loading) return;
    loading = true;

    try {
        console.log(`Cargando imágenes (Página ${currentPage})...`);

        const response = await fetch(`${apiUrl}?limit=6&page=${currentPage}`, {
            method: "GET",
            headers: {
                "x-api-key": apiKey
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("RespuestaAPI:", data);
        
        displayDogs(data);
        currentPage++;

    } catch (error) {
        console.error("Error al obtener imágenes:", error);
    } finally {
        loading = false;
    }
}


function displayDogs(dogs) {
    const container = $("#card-container");

    if (!container.length) {
        console.error("Error");
        return;
    }

    dogs.forEach(dog => {
        const card = $(`
            <div class="relative bg-gradient-to-r from-blue-900 via-purple-800 to-indigo-900 
                        text-white p-6 shadow-xl rounded-xl border border-cyan-400 
                        transform transition duration-300 hover:scale-105 
                        hover:shadow-cyan-400/50 hover:border-cyan-300 
                        w-80 h-auto flex flex-col items-center text-center overflow-hidden">
                
                <div class="absolute top-0 left-0 w-full h-1 bg-cyan-400"></div>

                <img src="${dog.url}" 
                     alt="Dog" 
                     class="w-64 h-64 object-cover rounded-lg border-4 border-cyan-300 shadow-md mt-3">
                
                <h2 class="text-2xl font-bol">ID: ${dog.id}</h2>
                
                <p class="text-md text-gray-200"> ${dog.width}px x ${dog.height}px</p>
                
                
                <div class="absolute bottom-0 left-0 w-full h-1 bg-cyan-400"></div>
            </div>
        `);

        container.append(card);
    });
}
