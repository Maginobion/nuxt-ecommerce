<template>
    <div>
        <h1>Login</h1>
        <p v-if="query.err" class="sysMsg">{{ query.err }}</p>
        <form v-on:submit="login" action="">
            <label for="username" class="form-label">Username:</label>
            <input 
                class="form-input" 
                name="user" 
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
            <p class="err" v-if="error">{{error}}</p>
            <input type="submit" value="Siguiente">
        </form>
        <p>¿No tienes una cuenta? <NuxtLink to="/auth/registro">Regístrate</NuxtLink></p>
        <p><NuxtLink to="/auth/recover">Olvidaste tu contraseña?</NuxtLink></p>
    </div>   
</template>

<script setup lang="ts">

    import { login, error } from '@@/controllers/controlLogin'

    const { query } = useRoute()

    definePageMeta({
        middleware: 'is-guest'
    })

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


</style>