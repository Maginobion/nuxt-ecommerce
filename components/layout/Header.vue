<template>
    <header>
        <div class="header-top">
            <img src="/img/logo.png" width="180" height="65">
            <div class="search-bar">
                <form v-on:submit="find">
                    <input 
                        type="text" 
                        class="search" 
                        name="text" 
                        placeholder="Busque aquí"
                    >
                    <input type="submit" value="Buscar">
                </form>
            </div>
            <div class="buttons">
                <div class="login">
                    <button class="logout" v-if="isAuth" @click="logout">Cerrar sesión</button>
                    <NuxtLink v-else to="/auth/login">Login</NuxtLink>
                </div>
                <!-- <button class="shopping-cart">
                    <router-link :to="{name:'listaSeleccion'}">
                        <i class="fa-solid fa-cart-plus"></i>
                    </router-link>
                </button> -->
            </div>
        </div>
        <div class="header-bottom">
            <ul v-if="!loading">
                <NuxtLink to="/">Home</NuxtLink>
                <NuxtLink to="/productos/add">Agregar</NuxtLink>
                <NuxtLink to="/cart">Mi carrito</NuxtLink>
                <NuxtLink to="/order-history">Historial de compras</NuxtLink>
                <!-- <Header-links routing="/atencion-cliente" text="Atencion"/>
                <Header-links routing="/adduser" text="Mi Perfil"/>              
                <template v-if="id===1 || isadmin">                   
                    <Header-links routing="/edituser" text="Editar usuarios"/>
                    <Header-links routing="/addlibro" text="Agregar libro"/>
                    <Header-links routing="/libreria" text="Tus libros"/>
                </template>               -->
            </ul>
        </div>
    </header>
</template>

<script setup lang="ts">

    const isAuth = useAuth()

    const logout = () =>{
        isAuth.value = false
        const token = useCookie<string|null>('Authorization')
        token.value = null
        navigateTo('/')
    }

    const loading = ref(false)
    
    const find = async (e:Event) =>{

        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement) 
        const formProps = Object.fromEntries(formData)

        if(!formProps.text){
            await navigateTo('/')
        }

        else await navigateTo({
            path: '/productos/search',
            query:{
                text: formProps.text as string
            },
        }, {
            replace: true,

        })
    }

</script>

<style scoped>
@media (max-width: 600) {
    header {
        display: flex;
        justify-items: center;
        margin-left: 20px;
    }
}

header {
    padding: 1rem 0 0 1rem;
    background-color: var(--bg);
}

.header-top {
    padding: 1rem 0 0 0;
    display: flex;
    align-items: center;
    margin-bottom: 20px;
}

.header-top .img {
    padding: 10px;
    background-color: var(--bg-secondary);
    object-fit: cover;
}

img {
    padding: 10px;
    background-color: var(--color);
    border-radius: 12px;
    object-fit: cover;
}

.search-bar {
    flex-grow: 1;
    width: 100%;
    padding: 0 1.5rem;
    display: flex;
    flex-direction: column-reverse;
}

.search {
    display: flex;
    border: 1px solid #002f84;
    border-radius: .5rem;
}

form{
    display: flex;
}

input[type="text"]{
    border: 0;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
}

input {
    /* flex-grow: 1; */
    padding: .5rem 1rem;
    font-size: 1.125rem;
    border: none;
    border-top-right-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
    outline: none;
}

.searchButton {
    background: #ffbe07;
    padding: 0 1rem;
    display: flex;
    align-items: center;
    border-radius: 0 .5rem .5rem 0;
    cursor: pointer;
}

i {
    font-size: 1.125rem;
    color: #002f84;
}

.buttons {
    padding: 0 1rem;
    display: flex;
    align-items: flex-end;
}

.login {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 1rem;
    align-items: center;
    border: none;
    outline: none;
    cursor: pointer;
    background: transparent;
}
.logout{
    border: 0;
    background-color: var(--bg-secondary);
    padding: 2px 6px;
    border-radius: 4px;
}

.buttons .shopping-cart {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 1rem;
    align-items: center;
    border: none;
    outline: none;
    cursor: pointer;
    background: transparent;
}

.buttons .shopping-cart i {
    font-size: 2.25rem;
    padding-bottom: .5rem;
    color: #002f84;
}

.header-bottom {
    margin: 0;
}

.header-bottom ul {
    display: flex;
    list-style: none;
    justify-content: center;
    align-items: center;
}

.header-bottom ul a {
    padding: .5rem 1.75rem;
    text-transform: uppercase;
    border-right: 1px solid #002f84;
    letter-spacing: 0.125rem;
    transition: .3s ease;
    text-decoration: none;
}

.header-bottom ul a:last-child {
    border-right: 0px solid #002f84;
}

.header-bottom ul a:hover {
    background: #002f84;
    color: #fff;
}
</style>
