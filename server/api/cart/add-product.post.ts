import User from "../../db/models/user"
import jwt from 'jsonwebtoken'

type DecodedCookie = {
    exp: number,
    email: string,
    username: string,
    iat: number
}

export default defineEventHandler(async (event)=>{

    const token = getCookie(event, 'Authorization')

    if(!token){
        return { 
            status: false,
            msg: 'No estás logueado' 
        }
    }

    const decoded = jwt.verify(token,'secret') as DecodedCookie

    console.log(decoded.username)

    if(!decoded){
        createError('error de acceso')
        return {res: 'error de acceso'}
    }

    const user = await User.findOne({name: decoded.username})

    if(!user){
        createError('error de acceso')
        return {res: 'error de acceso'}
    }

    const { id }:{ id:number } = await readBody(event)

    user.addToCart(id)

    return{
        newCart: user.cart
    }
})