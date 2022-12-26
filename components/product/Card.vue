<template>
    <div class="productCard">
        <NuxtImg
            :src="'https://iitabnplpszjflqtozji.supabase.co/storage/v1/object/public/ecommerce-bucket/'+product.image" 
            alt="img"
            width="180px"
            height="200px"
        />
        <p>{{product.name}}</p>
        <p>S/.{{product.price}}</p>
        <NuxtLink :to="'productos/'+product._id">Ver producto</NuxtLink>
    </div>
</template>

<script setup>
    defineProps(['product'])
</script>

<style scoped>
.productCard{
    background-color: var(--bg-secondary);
    padding: 10px 14px;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
}

.productCard p{
    color: var(--color);
}
.productCard img{
    margin: auto;
}

a{
    margin-top: auto;
    color: var(--color-primary);
    width: 100%;
    text-decoration: none;
    background-color: aquamarine;
    padding: 4px;
    box-sizing: border-box;
    border-radius: 4px;
    text-align: center;
}

</style>