<template>
    <div>
        <p>Historial</p>
        <p v-if="!pending">{{data}}</p>
        <p>{{error}}</p>
    </div>   
</template>

<script setup lang="ts">

    definePageMeta({
        middleware: 'auth'
    })

    const headers = useRequestHeaders(['cookie'])
    const { data, pending, error } = await useFetch('/api/products/myproducts', {
        headers: headers as HeadersInit
    })
</script>

<style scoped>

</style>