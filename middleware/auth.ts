export default defineNuxtRouteMiddleware((to,from)=>{

    const auth = useAuth()

    if(!auth.value){
        console.log('Middleware auth')
        return navigateTo({
            path: '/auth/login',
            query:{
                err:"Acceso inválido"
            }
        })
    }
})