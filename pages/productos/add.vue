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
    </div>
</template>

<script setup lang="ts">

    definePageMeta({
        middleware: 'auth'
    })

    const imagen = ref<File | undefined>()

    const mensajes = ref<boolean | string>('')

    const disabled = ref<boolean>(false)

    const client = useSupabase()

    const {data:categories, pending, refresh} = await useFetch('/api/categories/all')

    const getImage = (e:Event) => {
        const target = e.target as HTMLInputElement
        imagen.value = target.files?.[0]
    }

    const submitProductForm = async (e:Event) =>{

        e.preventDefault()

        const values = e.target as HTMLFormElement
        
        const formData = new FormData(values)

        if(!imagen.value){
            console.log('xd')
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

        console.log([...formData])

        const formProps = Object.fromEntries(formData) as { [a: string]: string | number }

        console.log(formProps)

        uploadData(formProps) 
            
        // }          
    }

    const uploadData = async (data: object) =>{

        const res = await $fetch('/api/products/add',{
            method: 'POST',
            body: data,
        })   
        
        console.log(res)
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