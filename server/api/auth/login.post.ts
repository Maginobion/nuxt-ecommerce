import User from "~~/server/db/models/user"
import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event)=>{

    const { user, pass } = await readBody(event)

    const res = await User.makeValidation(user,pass)

    if(!res.name){
        return { status: false }
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