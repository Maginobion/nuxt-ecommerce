<template>
    <div>
        <h1>Recuperar contraseña</h1>
        <p v-if="query.err" class="sysMsg">{{ query.err }}</p>
        <form v-on:submit="makeRecovery">
            <p>Ingrese el correo electrónico vinculado a su cuenta.</p>
            <label for="email" class="form-label">Correo:</label>
            <input 
                class="form-input" 
                name="email" 
                id="email" 
                placeholder="Ingrese su correo"
                required
            >
            <p class="err" v-if="error">{{error}}</p>
            <input type="submit" value="Enviar correo de recuperación">
        </form>
    </div>   
</template>

<script setup lang="ts">

    const { query } = useRoute()

    definePageMeta({
        middleware: 'is-guest'
    })

    const error = ref('')

    const makeRecovery = async (e:Event) =>{

        e.preventDefault()

        const values = e.target as HTMLFormElement
        
        const formData = new FormData(values)

        const formProps = Object.fromEntries(formData) as { [a: string]: string | number }

        const res = await $fetch('/api/auth/send-recovery',{
            method: 'POST',
            body: formProps
        })

        if(res.status){
            navigateTo({
                path: '/',
                query:{
                    msg:"Si el correo es correcto, recibirás un correo de recuperación"
                }
            })
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
    padding: 2rem;
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
</style>