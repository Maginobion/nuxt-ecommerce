<template>
    <div class="globalFlex">
        <form v-on:submit="submitProductForm" class="form" enctype="multipart/form-data">
            <div class="form-header">
                <h1 class="form-title">Nuevo producto</h1>
            </div>
            <label for="titulo" class="form-label">Nombre:</label>
            <input 
                type="text" 
                id="titulo" 
                class="form-input" 
                name="name" 
                placeholder="Ingrese el nombre del producto"
                required
            >

            <label for="descripcion" class="form-label">Descripción:</label>
            <input 
                class="form-input" 
                name="description" 
                id="descripcion" 
                placeholder="Ingrese su descripción"
                required
            >

            <label for="categoria" class="form-label">Categoría:</label>
            <select 
                name="Category" 
                id="categoria"
                required
            >
                <option v-for="category in categories" :value="category._id">{{category.name}}</option>
            </select>

            <label for="imagen" class="form-label">Imagen:</label>
            <input 
                type="file" 
                class="form-file"
                @change="getImage" 
                id="imagen" 
                accept="image/png, image/jpeg"
                required
            >

            <label for="precio" class="form-label">Precio:</label>
            <input 
                type="number" 
                id="precio"
                value="0"
                min="0"
                class="form-input" 
                name="price" 
                placeholder="Ingrese el precio"
                required
            >

            <label for="cantidad" class="form-label">Existencias:</label>
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

            <p class="err" v-if="error">{{error}}</p>

            <input type="submit" class="btn-submit" value="Confirmar"><br> <br> 
        </form>
        <form v-on:submit="submitCategoryForm" class="form" enctype="multipart/form-data">
            <div class="form-header">
                <h1 class="form-title">Nueva categoría</h1>
            </div>
            <label for="category" class="form-label">Nombre:</label>
            <input 
                type="text" 
                name="name"
                placeholder="Ingrese el nombre de la categoría" 
                class="form-input" 
                id="category"
            >

            <input 
                type="submit" 
                class="categorySubmit" 
                value="Confirmar"
                :disabled="disabled"
            >
            {{mensajes}}
        </form>
        <table v-if="!userPending">
            <thead>
                <tr>
                    <th>Usuario</th>
                    <th>Correo</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in users?.users">
                    <td>{{ user.name }}</td>
                    <td>{{ user.email }}</td>
                    <td>
                        <p v-if="user.role===2">SuperAdmin</p>
                        <button v-else-if="user.role===1" @click="removeAdmin(user._id)">Remover admin</button>
                        <button v-else @click="giveAdmin(user._id)">Otorgar admin</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <table v-if="!productPending">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Existencias</th>
                    <th>Precio</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="product in products">
                    <td>{{ product.name }}</td>
                    <td>{{ product.quantity }}</td>
                    <td>{{ product.price }}</td>
                    <td>
                        <button @click="editProduct(product._id)">Editar</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">

    definePageMeta({
        middleware: ['auth', 'is-admin']
    })

    const imagen = ref<File | undefined>()

    const mensajes = ref<boolean | string>('')

    const error = ref('')

    const disabled = ref<boolean>(false)

    const client = useSupabase()

    const {data:categories, refresh} = await useFetch('/api/categories/all')

    const headers = useRequestHeaders(['cookie'])

    const editProduct = (id: string) =>{
        navigateTo({
            path:'/productos/edit',
            query:{
                id: id
            }
        })
    }

    const {data:users, pending: userPending, refresh: userRefresh} = await useFetch('/api/users/getAll',{
        method: 'post',
        headers: headers as HeadersInit
    })

    const {data:products, pending: productPending, refresh: productRefresh} = await useFetch('/api/products/all')

    const giveAdmin = async (id: string) =>{
        const res = await $fetch('/api/users/makeAdmin',{
            method: 'post',
            body: { id: id }
        })
        userRefresh()
    }

    const removeAdmin = async (id: string) =>{
        const res = await $fetch('/api/users/removeAdmin',{
            method: 'post',
            body: { id: id }
        })
        userRefresh()
    }

    const getImage = (e:Event) => {
        const target = e.target as HTMLInputElement
        imagen.value = target.files?.[0]
    }

    const submitProductForm = async (e:Event) =>{

        e.preventDefault()

        const values = e.target as HTMLFormElement
        
        const formData = new FormData(values)

        if(!imagen.value){
            ponerErrores('Selecciona una imagen')
            return
        }
        
        const { data, error } = await client
        .storage
        .from('ecommerce-bucket')
        .upload(new Date().toISOString(), imagen.value, {
            cacheControl: '3600',
            upsert: false,
        })

        formData.append('image', data?.path as string)

        const formProps = Object.fromEntries(formData) as { [a: string]: string | number }

        uploadData(formProps)      
    }

    const uploadData = async (data: object) =>{

        const res = await $fetch('/api/products/add',{
            method: 'POST',
            body: data,
        })   
        
        if(res.status){
            navigateTo({
                path: '/',
                query:{
                    msg:"Producto añadido"
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

    const submitCategoryForm = async (e:Event) => {
        
        e.preventDefault()

        const formData = new FormData(e.target as HTMLFormElement)

        const formProps = Object.fromEntries(formData)

        const res = await $fetch('/api/categories/add',{
            method: 'POST',
            body: formProps
        }).catch(e=>mensajes.value=e)

        if(res.res===true){
            mensajes.value='Categoría registrada con éxito.'
            disabled.value=true
            refresh()
        }
    }
</script>

<style scoped>
.globalFlex{    
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
}
.form-header .form-title{
    font-weight: normal;
    font-family: sans-serif;
    color:var(--color-primary);
    text-align: center;
    padding: 14px 0;
}
.form-header::first-letter{
    color:var(--color);
}
.form-header .form-title span{
    color:var(--color-primary);
}
.form{
    background: #e6ccb2;
    width: 90%;
    max-width: 650px;
    margin: auto;
    padding: 5px 35px;
    margin-top: 30px;
    padding-bottom:30px;
    border-radius: 3px;
}
.form-label{
    display:block;
    color: var(--color-primary);
    font-size: 16px;
    margin-bottom: 4px;
    font-family: Roboto;
    position: relative;
}
.form-input, .form-textarea{
    background: rgba(50, 46, 46, 0.7);
    border: none;
    outline: none;
    border-bottom: 2px solid var(--color-primary);
    width: 100%;
    padding: 12px 0 12px 12px;
    margin-bottom: 20px;
    border-radius: 2px;
    font-size: 14px;
    color: #FFF;
    box-sizing: border-box;
}

.form-file{
    margin: 0 0 10px 0;
}
.form-textarea{
    max-height: 100px;
    min-height:50px;
}
.btn-submit {
    width: 100%;
    font-family: Roboto;
    outline:none;
    background: var(--color);
    font-size: 16px;
    border:none;
    color:#fff;
    padding: 15px 0;
    cursor: pointer;
    transition: all .5s ease;
}

.err{
    color: var(--error-color);
    animation: appear 4s ease-in-out both;
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


.btn-submit:disabled {
    background-color: gray;
    cursor: default;
}

.form .btn-submit:hover, .categorySubmit:hover{
    background-color: var(--color-secondary);
}
.categorySubmit{
    font-family: Roboto;
    outline:none;
    background: var(--color);
    font-size: 16px;
    width: 100%;
    border:none;
    color:#fff;
    padding: 15px 20px;
    cursor: pointer;
    transition: all .5s ease;
}

.categorySubmit:disabled{
    cursor: default;
    background-color: gray;
}
</style>