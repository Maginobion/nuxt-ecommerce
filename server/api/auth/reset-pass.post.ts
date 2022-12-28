import User from '~~/server/db/models/user'

export default defineEventHandler(async (event) => {

    const { pass, rePass, recoveryKey } = await readBody(event) // Pass params via JSON in the POST request

    if(!pass.trim() || !rePass.trim() || !recoveryKey.trim()){
        return {
            status: false,
            msg: 'Rellene todos los campos.' 
        }
    }

    if(pass.trim() !== rePass.trim()){
        return {
            status: false,
            msg: 'Las contraseñas no coinciden.' 
        }
    }

    if(pass.trim().length <= 4){
        return {
            status: false,
            msg: 'La contraseña debe ser de al menos 5 caracteres.' 
        }
    }

    if(!recoveryKey?.trim()){
        return { 
            status: false,
            msg: 'Acceso inválido' 
        }
    }

    const user = await User.findOne({recoveryKey: recoveryKey})

    if(!user){
        return { 
            status: false,
            msg: 'Acceso inválido' 
        }
    }

    const restablecer = () =>{
        user.pass = pass
        user.recoveryKey = null
    }

    restablecer()

    await user.save()

    return {
        status: true,
        msg: 'Contraseña restablecida con éxito'
    }
})