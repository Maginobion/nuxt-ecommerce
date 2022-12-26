export default defineNuxtRouteMiddleware((to,from)=>{

    const auth = useAuth()

    if(auth.value){
        console.log('Middleware guest')
        return navigateTo({
            path: '/',
            query:{
                err:"Ya estás logueado"
            }
        })
    }
})