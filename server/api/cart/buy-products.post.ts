import User from "../../db/models/user"
import Invoice from "~~/server/db/models/invoice"
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

    const decoded = jwt.verify(token,'secret') as DecodedCookie

    if(!decoded){
        createError('error de acceso')
        return {res: 'error de acceso'}
    }

    const user = await User.findOne({name: decoded.username})

    if(!user){
        createError('error de acceso')
        return {res: 'error de acceso'}
    }

    const invoice = new Invoice({
        invoiceNumber: 123456789,
        userId:user._id,
        items: user.cart.items,
        total_price: user.cart.items.reduce((prev,curr)=> prev + curr.total_price, 0)
    })

    console.log(invoice)

    // invoice.save()

    return{
        newCart: user.cart
    }
})