<template>
    <div>
        <div class="productGrid" v-if="products.length>0">
            <ProductCard 
                v-for="product in products" 
                :product="product"
            />
        </div>
        <div v-else>
            No se encontraron productos.
        </div>
    </div>
      
</template>

<script setup>
    defineProps(['products'])
</script>

<style scoped>

.productGrid{
    padding: 0 2em;
    display: grid;
    justify-self: center;
    align-items: center;
    grid-auto-flow: row;
    grid-auto-columns: 340px;
    grid-template-columns: repeat(auto-fit, minmax(200px, 240px));
    gap: 10px;
}

</style>