export const error = ref('')

export const login = async (e:Event) =>{

    e.preventDefault()

    const values = e.target as HTMLFormElement
    
    const formData = new FormData(values)

    const formProps = Object.fromEntries(formData) as { [a: string]: string | number }

    const res = await $fetch('/api/auth/login',{
        method: 'POST',
        body: formProps
    })

    if(res.status){
        const auth = useAuth()
        auth.value = true
        navigateTo({
            path: '/',
            query:{
                msg:"Autenticación exitosa"
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