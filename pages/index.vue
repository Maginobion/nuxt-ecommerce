<template>
    <div>
        <p v-if="query.err" class="errMsg">{{ query.err }}</p>
        <p v-if="query.msg" class="successMsg">{{ query.msg }}</p>
        <h1>Home</h1>
        <ProductGrid 
            v-if="products"
            :products="products"
        />  
    </div>
</template>

<script setup lang="ts">

    const { query } = useRoute()

    const { data: products } = await useFetch('/api/products/all')

</script>

<style scoped>

.errMsg{
    background-color: var(--error-color);
    padding: 0.4em 1em;
    text-align: center;
    border-radius: 4px;
    color: white;
}
.successMsg{
    background-color: var(--success-color);
    padding: 0.4em 1em;
    text-align: center;
    border-radius: 4px;
    color: white;
}

h1{
    color: var(--color-primary);
}

</style>