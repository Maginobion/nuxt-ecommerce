import { Ref } from "vue"

const client = useSupabase()

export const actualizarCategorias = async() =>{
    const {data, refresh} = await useFetch('/api/categories/all')
    return {data, refresh}
}

export const actualizarUsuarios = async() =>{

    const headers = useRequestHeaders(['cookie'])

    const {data, pending: userPending, refresh} = await useFetch('/api/users/all',{
        method: 'post',
        headers: headers as HeadersInit
    })
}

export const actualizarProductos = async() =>{

    const headers = useRequestHeaders(['cookie'])

    const {data, refresh} = await useFetch('/api/categories/all')
    return {data, refresh}
}

export const submitProductForm = async (e:Event, imagen: Ref<File | undefined>, errorRef: Ref<String | undefined>) =>{

    e.preventDefault()

    const values = e.target as HTMLFormElement
    
    const formData = new FormData(values)

    if(!imagen.value){
        ponerErrores('Selecciona una imagen', errorRef)
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

    const res = await $fetch('/api/products/add',{
        method: 'POST',
        body: formProps,
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
        ponerErrores(res.msg, errorRef)
    }
}

const ponerErrores = (err: string, error: Ref<String | undefined>) =>{
    error.value = err
    setTimeout(()=>{
        error.value=''
    },4000)
}
