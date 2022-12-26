<template>
    <div class="pageCont">
        <h1>Búsqueda: {{query.text}}</h1>
        <ProductGrid 
            v-if="products"
            :products="products"
        />
    </div>  
</template>

<script setup lang="ts">

const route = useRoute()

const query = computed(()=>route.query)

const { data: products, refresh } = await useFetch('/api/products/find', {
    method: 'POST',
    query: query,
    server: false,
    lazy: true,
})
watch(()=>query, ()=>refresh())
</script>

<style scoped>
h1{
    color: var(--color-primary);
    text-align: center;
}
.pageCont{
    width: 100%
}
</style>