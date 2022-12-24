export default defineNuxtRouteMiddleware((to,from)=>{

    const auth = useAuth()

    if(auth.value){
        console.log(auth)
        return navigateTo({
            path: '/',
            query:{
                err:"Ya estás logueado"
            }
        })
    }
})