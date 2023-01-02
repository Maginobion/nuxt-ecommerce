import { ProductLine } from "~~/server/db/types"

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

    const res = await $fetch('/api/auth/cart-verify',{
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
    }
    if(res.user){
      
        if(res.user.cart.items.length<1){
            return navigateTo({
                path: '/',
                query:{
                    err: 'Acceso inválido'
                }
            })
        }

        const total_price = res.user.cart.items.reduce((prev: number,curr: ProductLine)=> prev + curr.total_price, 0)

        if(total_price<10){
            return navigateTo({
                path: '/',
                query:{
                    err: 'Agrega más productos. El monto mínimo de envío es de 10 soles.'
                }
            })
        }
    }
})