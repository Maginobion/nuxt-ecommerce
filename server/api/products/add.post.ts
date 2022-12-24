import Product from "~~/server/db/models/product"
import CategoryModel from "~~/server/db/models/category"
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

    try{
        jwt.verify(token,'secret') as DecodedCookie
    }
    
    catch{
        return { 
            status: false,
            msg: 'Acceso inválido' 
        }
    }

    const { name, description, image, Category, price, quantity } = await readBody(event)

    if(!name.trim() || !description.trim() || !image.trim() || !Category || !price || !quantity){
        return { 
            status: false,
            msg: 'No se han ingresado todos los campos' 
        }
    }

    if( isNaN(Number(price)) || isNaN(Number(quantity))){
        return { 
            status: false,
            msg: 'Ingrese valores válidos' 
        }
    }

    if( name.length < 5 || description.length < 5){
        return { 
            status: false,
            msg: 'El nombre y/o descripción son demasiado cortos' 
        }
    }

    const category = await CategoryModel.findOne({_id:Category})

    if(!category){
        return { 
            status: false,
            msg: 'Acceso inválido' 
        }
    }

    const test = Product.create({
        name: name.trim(),
        image: image.trim(),
        description: description.trim(),
        price: price,
        Category: Category,
        quantity: quantity
    })

    return {
        status: true,
        data: test
    }
})