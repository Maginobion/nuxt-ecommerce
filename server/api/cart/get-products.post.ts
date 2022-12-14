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

    if(!decoded){
        return { 
            status: false,
            msg: 'Acceso inválido' 
        }
    }

    const user = await User.findOne({name: decoded.username})

    if(!user){
        return { 
            status: false,
            msg: 'Acceso inválido' 
        }
    }

    return user.cart
})