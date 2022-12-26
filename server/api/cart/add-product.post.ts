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

    let decoded

    try{
        decoded = jwt.verify(token,'secret') as DecodedCookie
    }
    
    catch (err){
        console.log('Error en addproduct')
        return { 
            status: false,
            msg: 'Acceso inválido' 
        }
    }

    const user = await User.findOne({name: decoded.username})

    if(!user){
        createError('error de acceso')
        return { 
            status: false,
            msg: 'Acceso inválido' 
        }
    }

    const { id }:{ id:number } = await readBody(event)

    await user.addToCart(id)

    return{
        status: true,
        newCart: user.cart
    }
})