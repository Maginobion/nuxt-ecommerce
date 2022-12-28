export default defineNuxtRouteMiddleware(async (to,from)=>{

    const token = useCookie('Authorization')

    if(!token.value){
        return navigateTo({
            path: '/auth/login',
            query:{
                err:"Acceso inválido"
            }
        })
    }

    const headers = useRequestHeaders(['cookie'])

    const { status, msg, user } = await $fetch('/api/auth/user-verify',{
        method: 'post',
        headers: headers as HeadersInit
    })

    if(!status){
        const auth = useAuth()
        auth.value = false
        const token = useCookie('Authorization')
        token.value = null
        return navigateTo({
            path: '/auth/login',
            query:{
                err: msg
            }
        })
    } else if(user){
        if(user.role !== 1 && user.role !== 2){
            return navigateTo({
                path: '/',
                query:{
                    err: 'No tienes los permisos necesarios'
                }
            })
        }
    }
})