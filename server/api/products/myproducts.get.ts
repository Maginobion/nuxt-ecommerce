import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event)=>{

    const token = getCookie(event, 'Authorization')

    if(!token){
        return { res: 'no hay token ' }
    }

    const user = jwt.verify(token,'secret')

    if(!user){
        createError('error de acceso')
        return {res: 'error de acceso'}
    }

    return user
})