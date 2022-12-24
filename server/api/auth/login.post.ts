import User from "~~/server/db/models/user"
import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event)=>{

    const browserToken = getCookie(event, 'Authorization')

    if(browserToken){
        return { 
            status: false,
            msg: 'Ya estás logueado' 
        }
    }

    const { user, pass } = await readBody(event)

    if(!user || !pass){
        return { 
            status: false,
            msg: 'No se han ingresado todos los campos.' 
        }
    }

    const res = await User.makeValidation(user,pass)

    if(!res.name){
        return { 
            status: false, 
            msg: 'Usuario o contraseña incorrectos.'
        }
    }

    const token = jwt.sign({
        exp: Math.floor(Date.now()/1000)+ 60*60*24*15,
        email: res.email,
        username: res.name,
    },'secret')

    setCookie(event,'Authorization',token,{
        maxAge: 60*60*24*15
    })

    return { status: true }
})