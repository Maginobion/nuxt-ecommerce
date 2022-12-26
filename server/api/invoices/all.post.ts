import Invoice from "~~/server/db/models/invoice"
import jwt from 'jsonwebtoken'
import User from "~~/server/db/models/user"

type DecodedCookie = {
    exp: number,
    email: string,
    username: string,
    iat: number
}

const findUser = async (username: string) =>{
    const user = await User.findOne({name: username})
    return user
}

export default defineEventHandler(async (event)=>{

    const browserToken = getCookie(event, 'Authorization')

    if(!browserToken){
        return { 
            status: false,
            msg: 'No estás logueado'
        }
    }

    let decoded

    try{ 
        decoded = jwt.verify(browserToken as string,'secret') as DecodedCookie
    }
    
    catch{
        deleteCookie(event, 'Authorization')      
        return { 
            status: false,
            msg: 'Acceso inválido'
        }
    }

    const user = await findUser(decoded.username)

    console.log(user)

    if(!user){
        return { 
            status: false,
            msg: 'Acceso inválido'
        }
    }

    const invoices = await Invoice.find({userId: user._id})

    return invoices

})