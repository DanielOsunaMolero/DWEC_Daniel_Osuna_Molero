<template>
<button v-on:click="saluda">pulsame</button>


</template>

<script setup>

    const saluda=()=>{
        alert("hola");
    }

</script>