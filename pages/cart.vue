<template>
    <div>
        <h1>Carrito</h1>
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
                    <td><button @click="remove(item.productId)">Quitar {{ item.productId }}</button></td>
                </tr>
                <tr>
                    <td></td>
                    <td>Total</td>
                    <td>S/.{{ total }}</td>
                </tr>
            </tbody>
            
            <button>Comprar!</button>
        </table>
        <p v-else>Aun no agregas nada al carrito</p>
    </div>
</template>

<script setup lang="ts">

definePageMeta({
    middleware: 'auth'
})

const headers = useRequestHeaders(['cookie'])

const { data:cart, pending, refresh } = await useFetch<{items:{productId:string, quantity: number, total_price:number, productName: string}[]}>('/api/cart/get-products',{
    method: 'post',
    server: false,
    headers: headers as HeadersInit,
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
</style>