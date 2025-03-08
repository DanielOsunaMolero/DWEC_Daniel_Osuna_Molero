const apiKey = "";  // Coloca aquí tu clave API
const apiUrl = "https://api.thedogapi.com/v1/images/search";

let currentPage = 1;
let loading = false;

const container = $("#card-container");

if (container.length) {
    fetchDogs();
} else {
    console.error("Error: No se encontró el contenedor 'card-container'.");
}

// Cargar más imágenes al hacer scroll
$(window).on("scroll", function () {
    if ($(window).scrollTop() + $(window).height() >= $(document).height() - 200) {
        fetchDogs();
    }
});

async function fetchDogs() {
    if (loading) return;
    loading = true;

    try {
        console.log(`🔄 Cargando imágenes (Página ${currentPage})...`);

        
        const fetchRequests = Array.from({ length: 4 }, (_, i) => 
            fetch(`${apiUrl}?limit=10&page=${currentPage + i}`, {
                method: "GET",
                headers: {
                    "x-api-key": apiKey
                }
            }).then(response => {
                if (!response.ok) throw new Error(`HTTP Error! Status: ${response.status}`);
                return response.json();
            })
        );

        const results = await Promise.all(fetchRequests);
        const allDogs = results.flat(); 

        console.log(`✅ Imágenes obtenidas: ${allDogs.length}`);
        displayDogs(allDogs);
        currentPage += 4; // Avanzar 4 páginas

    } catch (error) {
        console.error("❌ Error al obtener imágenes:", error);
    } finally {
        loading = false;
    }
}

function displayDogs(dogs) {
    if (!container.length) return;

    dogs.forEach(dog => {
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
