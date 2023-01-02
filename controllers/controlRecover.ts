export const error = ref('')

export const makeRecovery = async (e:Event) =>{

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

export const resetPass = async (e:Event) =>{

    e.preventDefault()

    const values = e.target as HTMLFormElement
    
    const formData = new FormData(values)

    formData.append('recoveryKey', query.code as string)

    const formProps = Object.fromEntries(formData) as { [a: string]: string | number }

    const { status, msg } = await $fetch('/api/auth/reset-pass',{
        method: 'POST',
        body: formProps
    })

    if(status){
        navigateTo({
            path: '/',
            query:{
                msg: msg
            }
        })
    }
    else if (msg){
        ponerErrores(msg)
    }
}

const ponerErrores = (err: string) =>{
    error.value = err
    setTimeout(()=>{
        error.value=''
    },4000)
}