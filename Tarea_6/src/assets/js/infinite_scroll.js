window.addEventListener("scroll", () => {
    console.log("📜 Detectando scroll...");

    // Si el usuario está cerca del final de la página, cargar más cócteles
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 200) {
        console.log("🆕 Cargando más cócteles...");
        fetchDogs();
    }
});
