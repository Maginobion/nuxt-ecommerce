<template>
    <div>
        <h1>Historial</h1>
        <div v-if="!pending">
            <div v-for="invoice in invoices" class="invoice">
                <p>Boleta #{{ invoice.invoiceNumber }}</p>
                <p>Pedido realizado el {{invoice.createdAt}}</p>
                <p>Estado: {{ invoice.delivered ? 'Recibido' : 'No entregado' }}</p>
                <p>Total: S/.{{ invoice.total_price }}</p>
                <table>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Cantidad</th>
                            <th>Precio</th>
                        </tr>       
                    </thead>
                    <tbody>
                        <tr v-for="product in invoice.items">
                            <td>{{ product.productName }}</td>
                            <td>{{ product.quantity }}</td>
                            <td>{{ product.total_price }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <p>{{error}}</p>
    </div>   
</template>

<script setup lang="ts">

    definePageMeta({
        middleware: 'auth'
    })

    const headers = useRequestHeaders(['cookie'])

    const { data: invoices, pending, error } = await useFetch('/api/invoices/all', {
        method: 'post',
        headers: headers as HeadersInit
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
.invoice{
    background-color: var(--bg);
    padding: 1rem 2rem;
    border-radius: 10px;
}
</style>