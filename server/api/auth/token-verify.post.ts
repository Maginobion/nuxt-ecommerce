import User from '~~/server/db/models/user'
import crypto from 'crypto'

export default defineEventHandler(async (event) => {

    const { recoveryKey } = await readBody(event) // Pass params via JSON in the POST request

    if(!recoveryKey){
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

    return {
        status: true,
    }
})