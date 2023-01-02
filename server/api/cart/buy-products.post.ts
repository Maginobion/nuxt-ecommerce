import User from "../../db/models/user"
import Invoice from "~~/server/db/models/invoice"
import jwt from 'jsonwebtoken'
import { Counter } from "~~/server/db/models/counter"

type DecodedCookie = {
    exp: number,
    email: string,
    username: string,
    iat: number
}

type CartProduct = {
    total_price: number;
    productId: string,
    productName: string,
    quantity: number
}

const vaciarCarrito = (user) =>{
    user.cart.items = []
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
        return { 
            status: false,
            msg: 'Acceso inválido' 
        }
    }

    const user = await User.findOne({name: decoded.username})

    if(!user){
        return { 
            status: false,
            msg: 'Acceso inválido' 
        }
    }

    const { fullName, DNI, phone, geoPosition } = await readBody(event)

    if(!fullName.trim() || !DNI || !phone){
        return { 
            status: false,
            msg: 'No se han ingresado todos los campos' 
        }
    }

    if(!geoPosition.trim()){
        return { 
            status: false,
            msg: 'Es necesario obtener la posición' 
        }
    }

    if( isNaN(Number(DNI)) || isNaN(Number(phone))){
        return { 
            status: false,
            msg: 'Ingrese valores válidos' 
        }
    }

    if( DNI.length != 8 || phone.length < 7){
        return { 
            status: false,
            msg: 'Ingrese valores reales' 
        }
    }

    const total_price = user.cart.items.reduce((prev:number,curr:CartProduct)=> prev + curr.total_price, 0)

    const realizarPeticionVISA = (precio:number) =>{
        if(precio) return true
    }

    const res = realizarPeticionVISA(total_price)

    if(!res){
        return { 
            status: false,
            msg: 'Hubo un error con su pago, inténtelo de nuevo más tarde.' 
        }
    }

    const { seq } : { seq: number } = await Counter.counterValue('invoice')

    const invoiceNumber = seq.toString().padStart(7,'0')

    const invoice = await Invoice.create({
        invoiceNumber: invoiceNumber,
        userId: user._id,
        delivered: false,
        fullName: fullName,
        DNI: DNI,
        phone: phone,
        geoPosition: geoPosition,
        items: user.cart.items,
        total_price: total_price
    })

    vaciarCarrito(user)

    await user.save()

    return { 
        status: true,
        newInvoice: invoice
    }
})