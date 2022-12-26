import User from "../../db/models/user"
import jwt from 'jsonwebtoken'

type DecodedCookie = {
    exp: number,
    email: string,
    username: string,
    iat: number
}

type CartProduct = {
    total_price: number;
    productId: string,
    productName: string,
    quantity: number
}

export default defineEventHandler(async (event)=>{

    const token = getCookie(event, 'Authorization')

    if(!token){
        return { res: 'no hay token ' }
    }

    const decoded = jwt.verify(token,'secret') as DecodedCookie

    if(!decoded){
        createError('error de acceso')
        return {res: 'error de acceso'}
    }

    const user = await User.findOne({name: decoded.username})

    if(!user){
        createError('error de acceso')
        return {res: 'error de acceso'}
    }

    const { id } = await readBody(event)
    
    console.log(id)
    
    user.cart.items = user.cart.items.filter((a:CartProduct)=>a.productId.toString()!==id)

    console.log(user.cart.items)

    user.save()

    return {
        status: true
    }
})