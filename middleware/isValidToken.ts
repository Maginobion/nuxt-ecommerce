export default defineNuxtRouteMiddleware(async (to,from)=>{

    const token = useCookie('Authorization')

    if(token){
        return navigateTo({
            path: '/',
            query:{
                err:"Acceso inválido"
            }
        })
    }

    const route = useRoute()

    const recoveryKey = route.query.code // Pass params via JSON in the POST request

    const { status, msg } = await $fetch('/api/auth/token-verify',{
        method: 'post',
        body: { recoveryKey: recoveryKey }
    })

    if(!status){
        navigateTo({
            path: '/',
            query:{
                err: msg
            }
        })
    }
})