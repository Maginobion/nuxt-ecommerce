<template>
    <div>
        <p>Login</p>
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
                name="pass" 
                id="contra" 
                placeholder="Ingrese su contraseña"
                required
            >

            <label for="reContra" class="form-label">Repetir contraseña:</label>
            <input 
                class="form-input" 
                name="rePass" 
                id="reContra" 
                placeholder="Ingrese su contraseña nuevamente"
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

    const register = async (e:Event) =>{

        e.preventDefault()

        const values = e.target as HTMLFormElement
        
        const formData = new FormData(values)

        const formProps = Object.fromEntries(formData) as { [a: string]: string | number }

        const res = await $fetch('/api/auth/signup',{
            method: 'POST',
            body: formProps
        })

        console.log(res)
    }
</script>

<style scoped>

</style>