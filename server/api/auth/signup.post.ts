import User from "~~/server/db/models/user"
import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event)=>{

    const { email, name, pass, rePass } = await readBody(event)

    if(!email || !pass || !name || !rePass){
        return { 
            status: false,
            msg: 'No se han ingresado todos los campos.' 
        }
    }

    const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    if(!emailRegex.test(email)){
        return { 
            status: false,
            msg: 'Ingrese un correo válido.' 
        }
    }

    if(pass.length < 5){
        return {
            status: false,
            msg: 'La contraseña debe ser de al menos 5 caracteres.' 
        }
    }

    if(pass !== rePass){
        return { 
            status: false,
            msg: 'Las contraseñas no coinciden.' 
        }
    }

    const existingEmail = await User.findOne({email:email})

    if(existingEmail){
        return { 
            status: false,
            msg: 'Ya existe un usuario con el correo ingresado.' 
        }
    }

    const existingUsername = await User.findOne({name:name})

    if(existingUsername){
        return { 
            status: false,
            msg: 'El nombre de usuario ingresado ya existe.' 
        }
    }

    const newUser = await User.create({
        name: name,
        email: email,
        pass: pass
    })

    const token = jwt.sign({
        exp: Math.floor(Date.now()/1000)+ 60*60*24*15,
        email: newUser.email,
        username: newUser.name,
    },'secret')

    setCookie(event,'Authorization',token,{
        maxAge: 60*60*24*15
    })

    return {
        status: true,
    }
})