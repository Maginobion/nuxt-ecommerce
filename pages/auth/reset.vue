<template>
    <div>
        <h1>Restablecer contraseña</h1>
        <p v-if="query.err" class="sysMsg">{{ query.err }}</p>
        <form v-on:submit="resetPass" action="">
            <label for="pass" class="form-label">Nueva contraseña:</label>
            <input 
                class="form-input"
                type="password" 
                name="pass" 
                id="pass" 
                placeholder="Ingrese su contraseña"
                required
            >

            <label for="rePass" class="form-label">Repita la nueva contraseña:</label>
            <input
                class="form-input"
                type="password" 
                name="rePass" 
                id="rePass"
                placeholder="Vuelva a ingresar su contraseña"
                required
            >
            <p class="err" v-if="error">{{error}}</p>
            <input type="submit" value="Confirmar">
        </form>
    </div>   
</template>

<script setup lang="ts">

    import { resetPass, error } from '@@/controllers/controlRecover'

    const { query } = useRoute()

    definePageMeta({
        middleware: ['is-valid-token']
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