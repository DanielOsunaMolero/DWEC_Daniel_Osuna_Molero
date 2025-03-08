const apiKey = "";
const apiUrl = "https://api.thedogapi.com/v1/images/search";

let currentPage = 1;
let loading = false;

$(document).ready(function () {
    const container = $("#card-container");

    if (container.length === 0) {
        console.error("❌ Error: No se encontró el contenedor 'card-container'.");
        return;
    }

    fetchDogs();

    
    $(window).on("scroll", function () {
        if ($(window).scrollTop() + $(window).height() >= $(document).height() - 200) {
            fetchDogs();
        }
    });
});

function fetchDogs() {
    if (loading) return;
    loading = true;

    console.log(`🔄 Cargando imágenes (Página ${currentPage})...`);

    
    const fetchRequests = Array.from({ length: 4 }, (_, i) =>
        $.ajax({
            url: `${apiUrl}?limit=10&page=${currentPage + i}`,
            method: "GET",
            headers: {
                "x-api-key": apiKey
            }
        })
    );

    $.when(...fetchRequests).done(function (...responses) {
        
        const allDogs = responses.flatMap(response => response[0]); 

        console.log(`🐶 Imágenes obtenidas: ${allDogs.length}`, allDogs);
        displayDogs(allDogs);
        currentPage += 4; 
    }).fail(function (error) {
        console.error("❌ Error al obtener imágenes:", error);
    }).always(function () {
        loading = false;
    });
}

function displayDogs(dogs) {
    const container = $("#card-container");
    if (!container.length) return;

    dogs.forEach(dog => {
        if (!dog || !dog.url || !dog.id || !dog.width || !dog.height) {
            console.warn("❌ Se encontró un perro con datos incompletos:", dog);
            return; 
        }

        const card = $(`
            <article class="relative bg-gradient-to-r from-blue-900 via-purple-800 to-indigo-900 
                          text-white p-4 shadow-lg rounded-xl border border-cyan-400 
                          transform transition duration-300 hover:scale-105 hover:shadow-cyan-400/50 
                          hover:border-cyan-300 w-full max-w-xs flex flex-col items-center text-center overflow-hidden">
                
                <div class="absolute top-0 left-0 w-full h-1 bg-cyan-400"></div>

                <img src="${dog.url}" 
                     alt="Dog Image" 
                     class="w-full h-48 object-cover rounded-lg border-4 border-cyan-300 shadow-md mt-3">
                
                <h2 class="text-xl font-bold mt-2">ID: ${dog.id}</h2>
                
                <p class="text-sm text-gray-300"> ${dog.width}px x ${dog.height}px</p>

                <div class="absolute bottom-0 left-0 w-full h-1 bg-cyan-400"></div>
            </article>
        `);

        container.append(card);
    });
}
