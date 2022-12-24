<template>
    <div>
        <h1>Login</h1>
        <p v-if="query.msg" class="sysMsg">{{ query.msg }}</p>
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
        <p>¿No tienes una cuenta? <NuxtLink to="/auth/register">Regístrate</NuxtLink></p>
    </div>   
</template>

<script setup lang="ts">

    const { query } = useRoute()

    definePageMeta({
        middleware: 'is-guest'
    })

    const error = ref('')

    const login = async (e:Event) =>{

        e.preventDefault()

        const values = e.target as HTMLFormElement
        
        const formData = new FormData(values)

        const formProps = Object.fromEntries(formData) as { [a: string]: string | number }

        const res = await $fetch('/api/auth/login',{
            method: 'POST',
            body: formProps
        })

        if(res.status){
            const auth = useAuth()
            auth.value = true
            navigateTo('/')
        }
        else if (res.msg){
            ponerErrores(res.msg)
        }
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
    animation: appear 0.4s ease-in-out;
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