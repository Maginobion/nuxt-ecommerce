export const validarCookies = () =>{
    const token = useCookie('Authorization')

    if(!!token.value){
        return navigateTo({
            path: '/',
            query:{
                err:"Acceso inválido"
            }
        })
    }
}