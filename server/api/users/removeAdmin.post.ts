import User from "~~/server/db/models/user"
import jwt from 'jsonwebtoken'

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

    if(!user){
        return { 
            status: false,
            msg: 'Acceso inválido'
        }
    }

    if(user.role === 0){
        return { 
            status: false,
            msg: 'Acceso inválido'
        }
    }

    const { id } = await readBody(event)

    const foundUser = await User.findOne({_id: id})

    if(!foundUser){
        return { 
            status: false,
            msg: 'Acceso inválido'
        }
    }

    if(foundUser.role===0){
        return { 
            status: false,
            msg: 'Acceso inválido'
        }
    }

    foundUser.role = 0

    await foundUser.save()

    return {
        status: true,
        users: foundUser
    }
})