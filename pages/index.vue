<template>
    <div>
        <h1>Home</h1>
        <div class="productGrid">
            <div class="productCard" v-for="product in products">
                <p>{{product.name}}</p>
                <p>S/.{{product.price}}</p>
                <NuxtLink :to="'productos/'+product._id">Ver producto</NuxtLink>
            </div>
        </div>       
    </div>
</template>

<script setup lang="ts">

    const {data: products} = await useFetch('/api/products/all')

</script>

<style scoped>
.productGrid{
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 10px;
}
.productCard{
    background-color: aqua;
    padding: 10px 14px;
    border-radius: 4px;
}
</style>