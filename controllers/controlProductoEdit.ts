import { ProductType } from "~~/server/db/types"

const imagen = ref<File | undefined>()

const client = useSupabase()

export const error = ref('')

const { query } = useRoute()

const actualizarCategorias = async() =>{
    const data = await $fetch('/api/categories/all')
    return { data }
}

export const {data: categories} = await actualizarCategorias()

const actualizarProducto = async() =>{
    const res = await $fetch<ProductType>('/api/products/'+query.id)
    return res    
}

export const product = await actualizarProducto()

export const getImage = (e:Event) => {
    const target = e.target as HTMLInputElement
    imagen.value = target.files?.[0]
}

export const submitProductEdit = async (e:Event) =>{

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
    formData.append('id', query.id as string)

    const formProps = Object.fromEntries(formData) as { [a: string]: string | number }

    uploadData(formProps)      
}

const uploadData = async (data: object) =>{

    const res = await $fetch('/api/products/edit',{
        method: 'POST',
        body: data,
    })   

    if(res.status){
        navigateTo({
            path: '/',
            query:{
                msg:"Producto editado con éxito"
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