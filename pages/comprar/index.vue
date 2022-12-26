<template>
    <div>
        <h1>Datos de facturación</h1>
        <form v-on:submit="confirmarCompra" class="form" enctype="multipart/form-data">
            <label for="fullName" class="form-label">Nombre completo:</label>
            <input 
                type="text" 
                id="fullName" 
                class="form-input" 
                name="fullName" 
                placeholder="Ingrese el nombre del producto"
                required
            >

            <label for="DNI" class="form-label">DNI:</label>
            <input 
                class="form-input"
                type="number"
                name="DNI" 
                id="DNI" 
                placeholder="Ingrese su descripción"
                required
            >

            <label for="phone" class="form-label">Teléfono:</label>
            <input 
                class="form-input"
                type="number"
                name="phone" 
                id="phone" 
                placeholder="Ingrese su descripción"
                required
            >

            <button @click="getPos">Dame mi pos</button>
            <div class="geo" v-if="lat && lon">
                <p>Posición:</p>
                <p>Latitud: {{ lat }}</p>
                <p>Longitud: {{ lon }}</p>
            </div>

            <p class="err" v-if="error">{{error}}</p>
            <input type="submit" class="btn-submit" value="Confirmar">
        </form>
        <p>El proceso se llevará a cabo por VISA</p>
        <button>Continuar</button>  
    </div>
</template>

<script setup lang="ts">

definePageMeta({
    middleware: ['auth', 'has-products']
})

const lat = ref()
const lon = ref()
const error = ref('')

const fullAddress = computed(()=>{
    if(lat.value && lon.value) return lat.value+' '+lon.value
    return ''
})

const confirmarCompra = async (e: Event) =>{

    e.preventDefault()
    
    const values = e.target as HTMLFormElement
        
    const formData = new FormData(values)

    formData.append('geoPosition', fullAddress.value)

    const formProps = Object.fromEntries(formData) as { [a: string]: string | number }

    const { status, msg } = await $fetch('/api/cart/buy-products',{
        method:'POST',
        body: formProps
    })
    if(!status && msg) ponerErrores(msg) 
    else navigateTo({
        path: '/',
        query:{
            msg: 'Pedido realizado con éxito. Estaremos en contacto'
        }
    })
}

const getPos = (e: Event) =>{
    e.preventDefault()
    navigator.geolocation.getCurrentPosition((position)=>{
        lat.value = position.coords.latitude
        lon.value = position.coords.longitude
    })
}

const ponerErrores = (err: string) =>{
    error.value = err
    setTimeout(()=>{
        error.value=''
    },4000)
}

</script>

<style scoped>

.sysMsg{
    background-color: var(--error-color);
    padding: 0.4em 1em;
    text-align: center;
    border-radius: 4px;
    color: white;
}

h1{
    text-align: center;
    color: var(--color-secondary);
}
form{
    min-width: 300px;
    background-color: var(--bg);
    padding: 3rem 2rem;
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

form input{
    width: 100%;
    box-sizing: border-box;
    padding: 0.2rem 0.4rem;
}
.err{
    color: var(--error-color);
    animation: appear 4s ease-in-out;
    overflow: hidden;
    white-space: nowrap;
}

@keyframes appear{
    0%{
        max-height: 0;
        max-width: 0;
    }
    30%{
        max-width: 600px;
        max-height: 100px;
    }
    100%{
        max-height: 0;
        max-width: 0;
    }
}
.geo{
    margin: auto;
}
</style>