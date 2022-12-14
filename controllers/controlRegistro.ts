export const error = ref('')

export const register = async (e:Event) =>{

    e.preventDefault()

    const values = e.target as HTMLFormElement
    
    const formData = new FormData(values)

    const formProps = Object.fromEntries(formData) as { [a: string]: string | number }

    const { status, msg } = await $fetch('/api/auth/signup',{
        method: 'POST',
        body: formProps
    })
    
    if(status){
        const auth = useAuth()
        auth.value = true
        navigateTo({
            path: '/',
            query:{
                msg:"Registro exitoso"
            }
        })
    }

    if (!status && msg) {
        ponerErrores(msg)
    }
}
const ponerErrores = (err: string) =>{
    error.value = err
    setTimeout(()=>{
        error.value=''
    },4000)
}