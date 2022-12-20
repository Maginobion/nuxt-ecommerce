<template>
    <div class="productInfo" v-if="!pending && product">
        <p>{{ product.description }}</p>    
        <p>{{ product.name }}</p>
        <p>Precio: S/.{{ product.price }}</p>
        <button @click="cartAdd">Agregar al carrito</button>
    </div>
</template>

<script setup lang="ts">

    const route = useRoute()

    const headers = useRequestHeaders(['cookie'])

    const {data: product, pending} = await useFetch<{description: string, name: string, price: number}>('/api/products/'+route.params.id,{
        key: route.params.id as string
    })

    const cartAdd = async () =>{
        const { res } = await $fetch('/api/cart/add-product',{
            method: 'post',
            body: { id: route.params.id },
            headers: headers as HeadersInit
        })
        console.log(res)
    }
</script>

<style scoped>
.productInfo{
    background-color: var(--bg);
    padding: 1rem 2rem;
    width: 80%;
    border-radius: 10px;
}
</style>