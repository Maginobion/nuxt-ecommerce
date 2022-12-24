<template>
    <div>
        <h1>Datos de facturación</h1>
        <form v-on:submit="submitProductForm" class="form" enctype="multipart/form-data">
            <label for="titulo" class="form-label">Nombre completo:</label>
            <input 
                type="text" 
                id="titulo" 
                class="form-input" 
                name="name" 
                placeholder="Ingrese el nombre del producto"
                required
            >

            <label for="descripcion" class="form-label">DNI:</label>
            <input 
                class="form-input" 
                name="description" 
                id="descripcion" 
                placeholder="Ingrese su descripción"
                required
            >

            <label for="descripcion" class="form-label">Teléfono:</label>
            <input 
                class="form-input" 
                name="description" 
                id="descripcion" 
                placeholder="Ingrese su descripción"
                required
            >

            <button @click="getPos">Dame mi pos</button>
            <div class="geo" v-if="lat!=='' && lon!==''">
                <p>Posición:</p>
                <p>Latitud: {{ lat }}</p>
                <p>Longitud: {{ lon }}</p>
            </div>
            
            <!-- <label for="categoria" class="form-label">Dirección:</label>
            <input 
                class="form-input" 
                name="description" 
                id="descripcion" 
                placeholder="Ingrese su descripción"
                required
            >

            <label for="precio" class="form-label">Bloque/Dpto/Oficina:</label>
            <input 
                class="form-input" 
                name="description" 
                id="descripcion" 
                placeholder="Ingrese su descripción"
                required
            >

            <label for="precio" class="form-label">Referencia:</label>
            <input 
                class="form-input" 
                name="description" 
                id="descripcion" 
                placeholder="Ingrese su descripción"
                required
            >

            <label for="cantidad" class="form-label">Región:</label>
            <input 
                type="number" 
                id="cantidad"
                value="0"
                min="0"
                class="form-input" 
                name="quantity" 
                placeholder="Ingrese la cantidad"
                required
            >

            <label for="cantidad" class="form-label">Distrito:</label>
            <input 
                type="number" 
                id="cantidad"
                value="0"
                min="0"
                class="form-input" 
                name="quantity" 
                placeholder="Ingrese la cantidad"
                required
            > -->

            

            <input type="submit" class="btn-submit" value="Confirmar">
        </form>
        <p>El proceso se llevará a cabo por VISA</p>
        <button>Continuar</button>
        
    </div>
</template>

<script setup>

definePageMeta({
    middleware: 'auth'
})

const lat = ref('')
const lon = ref('')

const confirmarCompra = async () =>{
    const { status } = await $fetch('/api/cart/buy-products',{
        method:'POST',
    })
    status && refresh()
}

const getPos = (e) =>{
    e.preventDefault()
    const geo = navigator.geolocation.getCurrentPosition((position)=>{
        console.log(position)
        lat.value = position.coords.latitude
        lon.value = position.coords.longitude
    })
}

</script>

<style scoped>
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
    
}
</style>