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
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 10px;
}

</style>