<script>
const mensaje = "Hola desde MiComponente";
</script>


<template>
    <article classs="flex-column">
        <p> {{ mensaje }}</p>

    </article>

</template>

<style scoped>
.flex-column {
    display: flex;
    flex-direction: column;
    color: white;
}
</style>