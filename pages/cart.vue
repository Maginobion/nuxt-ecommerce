<template>
    <div>
        <h1>Carrito</h1>
        <p v-if="message" class="sysMsg">{{ message }}</p>
        <div v-if="pending">Cargando...</div>
        <table v-else-if="cart?.items?.length">
            <thead>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th>Acción</th>
            </thead>
            <tbody>
                <tr v-for="item in cart.items">
                    <td>{{ item.productName }}</td>
                    <td>{{ item.quantity }}</td>
                    <td>{{ item.total_price }}</td>
                    <td><button @click="remove(item.productId)">Quitar</button></td>
                </tr>
                <tr>
                    <td></td>
                    <td>Total</td>
                    <td>S/.{{ total }}</td>
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

definePageMeta({
    middleware: 'auth'
})

const { query } = useRoute()

const message = computed(()=>query.err)

const headers = useRequestHeaders(['cookie'])

const { data:cart, pending, refresh } = await useFetch<{items:{productId:string, quantity: number, total_price:number, productName: string}[]}>('/api/cart/get-products',{
    method: 'post',
    server: false,
    headers: headers as HeadersInit,
    cache: 'no-cache'
})

const remove = async (productId:string) => {
    const { status } = await $fetch('/api/cart/delete-product',{
        method:'POST',
        body: { id: productId }
    })
    status && refresh()
}

const total = computed(()=>cart.value?.items.reduce((prev,curr)=> prev + curr.total_price, 0))

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