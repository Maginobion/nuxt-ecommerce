export const lat = ref()
export const lon = ref()
export const error = ref('')

const fullAddress = computed(()=>{
    if(lat.value && lon.value) return lat.value+' '+lon.value
    return ''
})

export const confirmarCompra = async (e: Event) =>{

    e.preventDefault()
    
    const values = e.target as HTMLFormElement
        
    const formData = new FormData(values)

    formData.append('geoPosition', fullAddress.value)

    const formProps = Object.fromEntries(formData) as { [a: string]: string | number }

    const { status, msg } = await $fetch('/api/cart/buy-products',{
        method:'POST',
        body: formProps
    })
    if(!status && msg) ponerErrores(msg) 
    else navigateTo({
        path: '/',
        query:{
            msg: 'Pedido realizado con éxito. Estaremos en contacto'
        }
    })
}

export const getPos = (e: Event) =>{
    e.preventDefault()
    navigator.geolocation.getCurrentPosition((position)=>{
        lat.value = position.coords.latitude
        lon.value = position.coords.longitude
    })
}

const ponerErrores = (err: string) =>{
    error.value = err
    setTimeout(()=>{
        error.value=''
    },4000)
}