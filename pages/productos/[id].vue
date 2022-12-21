<template>
    <div class="productInfo" v-if="!pending && product">
        <NuxtImg
            :src="'https://iitabnplpszjflqtozji.supabase.co/storage/v1/object/public/ecommerce-bucket/'+product.image" 
            alt="img"
            width="180px"
            height="200px"
        />
        <div>
            <p>{{ product.name }}</p>
            <p>{{ product.description }}</p>         
            <p>Precio: S/.{{ product.price }}</p>
            <button @click="cartAdd">Agregar al carrito</button>
        </div>
    </div>
</template>

<script setup lang="ts">

    const route = useRoute()

    const headers = useRequestHeaders(['cookie'])

    const {data: product, pending} = await useFetch<{description: string, name: string, price: number, image: string}>('/api/products/'+route.params.id,{
        key: route.params.id as string
    })

    const cartAdd = async () =>{
        const { status, msg } = await $fetch('/api/cart/add-product',{
            method: 'post',
            body: { id: route.params.id },
            headers: headers as HeadersInit
        })
        !status ? navigateTo('/auth/login') : navigateTo('/cart')
    }
</script>

<style scoped>
.productInfo{
    display: flex;
    justify-content: center;
    gap: 12vw;
    background-color: var(--bg);
    padding: 1rem 2rem;
    width: 40vw;
    border-radius: 10px;
}
</style>