<template>
    <div>
        <h1>Home</h1>
        <ProductGrid 
            v-if="products"
            :products="products"
        />   
    </div>
</template>

<script setup lang="ts">

    const {data: products} = await useFetch('/api/products/all')

</script>

<style scoped>

h1{
    color: var(--color-primary);
}

</style>