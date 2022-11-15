<template>
    <div v-if="!pending && product">
        <p>{{product.description}}</p>    
        <p>{{product.name}}</p>
        <button>Agregar al carrito</button>
    </div>
</template>

<script setup lang="ts">

    const route = useRoute()

    const {data: product, pending} = await useFetch<{description: string, name: string}>('/api/products/'+route.params.id,{
        key: route.params.id as string
    })
</script>