<template>
    <div>
        <h1>Carrito</h1>
        <p v-if="useRoute().query?.err" class="sysMsg">{{ useRoute().query?.err }}</p>
        <div v-if="false">Cargando...</div>
        <table v-else-if="cartItems?.items?.length">
            <thead>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th>Acción</th>
            </thead>
            <tbody>
                <tr v-for="item in cartItems.items">
                    <td>{{ item.productName }}</td>
                    <td>{{ item.quantity }}</td>
                    <td>{{ item.total_price }}</td>
                    <td><button @click="remove(item.productId)">Quitar</button></td>
                </tr>
                <tr>
                    <td></td>
                    <td>Total</td>
                    <td>S/.{{ cartItems?.items?.reduce((prev:number,curr: ProductLine)=> prev + curr.total_price, 0) }}</td>
                </tr>
            </tbody>
            
            <NuxtLink to="/comprar">Comprar!</NuxtLink >
        </table>
        <div class="empty" v-else>
            <p>Aun no agregas nada al carrito</p>
            <p>Los productos que agregues se mostrarán aquí</p>
            <NuxtLink to="/">Volver al home</NuxtLink>
        </div>
    </div>
</template>

<script setup lang="ts">

import {
    cartItems,
    remove,
} from '@@/controllers/controlCart'
import { ProductLine } from '~~/server/db/types';

definePageMeta({
    middleware: 'auth'
})

</script>

<style scoped>
h1{
    text-align: center;
    color: var(--color-secondary);
}
table{
    border-collapse: collapse;
    border: 1px solid black;
}
table th{
    border: 1px solid black;
    padding: 0.8rem 1.2rem;
}
table td{
    padding: 0.4rem;
}
.empty{
    height: 30vh;
    padding-bottom: 4vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.empty a{
    margin-top: 20px;
    color: var(--color-primary);
    text-decoration: none;
    background-color: aquamarine;
    padding: 4px 12px;
    box-sizing: border-box;
    border-radius: 4px;
    text-align: center;
}
.empty a:hover{
    background-color: rgb(128, 241, 204);
}

.sysMsg{
    background-color: var(--error-color);
    padding: 0.4em 1em;
    text-align: center;
    border-radius: 4px;
    color: white;
}

</style>