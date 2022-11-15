import User from "~~/server/db/models/user"

export default defineEventHandler(async (event)=>{

    const { email, name, pass, rePass } = await readBody(event)

    console.log(email, name, pass, rePass)

    if(!email || !pass || !name){
        return { msg: 'No se han ingresado todos los campos.' }
    }

    const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    if(!emailRegex.test(email)){
        return { msg: 'Ingrese un correo válido.' }
    }

    if(pass.length < 5){
        return { msg: 'La contraseña debe ser de al menos 5 caracteres.' }
    }

    if(pass !== rePass){
        return { msg: 'Las contraseñas no coinciden.' }
    }

    const existingEmail = await User.findOne({email:email})

    if(existingEmail){
        return { msg: 'Ya existe un usuario con el correo ingresado.' }
    }

    const existingUsername = await User.findOne({name:name})

    if(existingUsername){
        return { msg: 'El nombre de usuario ingresado ya existe.' }
    }

    const newUser = User.create({
        name: name,
        email: email,
        pass: pass
    })

    return newUser
})