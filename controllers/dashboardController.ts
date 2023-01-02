export const imagen = ref<File | undefined>()

export const mensajes = ref<boolean | string>('')

export const error = ref<String | undefined>()

export const disabled = ref<boolean>(false)

const actualizarCategorias = async() =>{
    const data = await $fetch('/api/categories/all')
    return { data }
}

const actualizarUsuarios = async() =>{

    const data = await $fetch('/api/users/all',{
        method: 'post',
    })

    return { data }
}

const actualizarProductos = async() =>{
    const data = await $fetch('/api/products/all')
    return { data }
}

export const {data: categories} = await actualizarCategorias()

export const {data: users} = await actualizarUsuarios()

export const {data: products} = await actualizarProductos()

export const giveAdmin = async (id: string) =>{
    const { status, msg } = await $fetch('/api/users/makeAdmin',{
        method: 'post',
        body: { id: id }
    })

}

export const removeAdmin = async (id: string) =>{
    const { status, msg } = await $fetch('/api/users/removeAdmin',{
        method: 'post',
        body: { id: id }
    })

}

export const getImage = (e:Event) => {
    const target = e.target as HTMLInputElement
    imagen.value = target.files?.[0]
}

export const submitProductForm = async (e:Event) =>{

    const client = useSupabase()

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

export const submitCategoryForm = async (e:Event) => {
    
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
    }
}

const ponerErrores = (err: string) =>{
    error.value = err
    setTimeout(()=>{
        error.value=''
    },4000)
}
