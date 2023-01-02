<template>
    <div>
        <h1>Registro</h1>
        <form v-on:submit="register" action="">

            <label for="email" class="form-label">Correo electrónico:</label>
            <input 
                class="form-input" 
                name="email" 
                id="email" 
                placeholder="Ingrese su correo electrónico"
                required
            >

            <label for="username" class="form-label">Username:</label>
            <input 
                class="form-input" 
                name="name" 
                id="username" 
                placeholder="Ingrese su nombre de usuario"
                required
            >

            <label for="contra" class="form-label">Contraseña:</label>
            <input 
                class="form-input"
                type="password"
                name="pass" 
                id="contra" 
                placeholder="Ingrese su contraseña"
                required
            >

            <label for="reContra" class="form-label">Repetir contraseña:</label>
            <input 
                class="form-input"
                type="password" 
                name="rePass" 
                id="reContra" 
                placeholder="Ingrese su contraseña nuevamente"
                required
            >

            <p class="err" v-if="error">{{error}}</p>

            <input type="submit" value="Siguiente">
        </form>
    </div>   
</template>

<script setup lang="ts">

    import { register, error } from '@@/controllers/controlRegistro'

    definePageMeta({
        middleware: 'is-guest'
    })

</script>

<style scoped>

h1{
    text-align: center;
    color: var(--color-secondary);
}

form{
    min-width: 400px;
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
    max-height: 0;
    max-width: 0;
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

</style>