export default defineNuxtRouteMiddleware((to,from)=>{

    const token = useCookie('Authorization')

    if(token){
        return navigateTo({
            path: '/',
            query:{
                err:"Acceso inválido"
            }
        })
    }
})