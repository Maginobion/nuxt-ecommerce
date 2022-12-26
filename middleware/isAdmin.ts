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

    const res = await $fetch('/api/auth/admin-verify',{
        method: 'post',
        headers: headers as HeadersInit
    })

    if(!res.status){
        const auth = useAuth()
        auth.value = false
        const token = useCookie('Authorization')
        token.value = null
        return navigateTo({
            path: '/auth/login',
            query:{
                err: res.msg
            }
        })
    } else if(res.user){
        if(res.user.role !== 1 && res.user.role !== 2){
            return navigateTo({
                path: '/',
                query:{
                    err: 'No tienes los permisos necesarios'
                }
            })
        }
    }
})