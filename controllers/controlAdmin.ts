const logoutSistema = () =>{
    const auth = useAuth()
    auth.value = false
    const token = useCookie('Authorization')
    token.value = null
}

export const validarCookies = async () =>{
    const token = useCookie('Authorization')

    if(!token.value){
        return navigateTo({
            path: '/auth/login',
            query:{
                err:"Acceso inválido"
            }
        })
    }

    const { status, msg, user } = await $fetch('/api/auth/user-verify',{
        method: 'post',
    })

    if(!status){
        logoutSistema()
        return navigateTo({
            path: '/auth/login',
            query:{
                err: msg
            }
        })
    }
    if(user.role === 0){
        return navigateTo({
            path: '/',
            query:{
                err: 'No tienes los permisos necesarios'
            }
        })
    }
}
