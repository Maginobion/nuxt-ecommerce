<template>
    <div>
        <p>Login</p>
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
                name="pass" 
                id="contra" 
                placeholder="Ingrese su contraseña"
                required
            >

            <input type="submit" value="Siguiente">
        </form>
    </div>   
</template>

<script setup lang="ts">

    definePageMeta({
        middleware: 'is-guest'
    })

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
            console.log('logueado', auth)
        }
    }
</script>

<style scoped>

</style>