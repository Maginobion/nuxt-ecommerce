import Product from "~~/server/db/models/product"
import CategoryModel from "~~/server/db/models/category"
import jwt from 'jsonwebtoken'
import User from "~~/server/db/models/user"

type DecodedCookie = {
    exp: number,
    email: string,
    username: string,
    iat: number
}

const findUser = async (username: string) =>{
    const user = await User.findOne({name: username})
    return user
}

export default defineEventHandler(async (event)=>{

    const browserToken = getCookie(event, 'Authorization')

    if(!browserToken){
        return { 
            status: false,
            msg: 'No estás logueado'
        }
    }

    let decoded

    try{ 
        decoded = jwt.verify(browserToken as string,'secret') as DecodedCookie
    }
    
    catch{
        deleteCookie(event, 'Authorization')      
        return { 
            status: false,
            msg: 'Acceso inválido'
        }
    }

    const user = await findUser(decoded.username)

    if(!user){
        return { 
            status: false,
            msg: 'Acceso inválido'
        }
    }

    
    if(user.role!==0){
        return { 
            status: false,
            msg: 'Acceso inválido'
        }
    }


    const { id , name, description, image, Category, price, quantity }  = await readBody(event)

    if(!name.trim() || !description.trim() || !image.trim() || !Category || !price || !quantity){
        return { 
            status: false,
            msg: 'No se han ingresado todos los campos' 
        }
    }

    if( isNaN(Number(price)) || isNaN(Number(quantity)) || quantity<0 || price<0){
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

    const product = await Product.findOne({_id: id})

    if(!product){
        return { 
            status: false,
            msg: 'Ha habido un error al ejecutar la solicitud. Inténtelo más tarde.' 
        }
    }

    if(product.name !== name){
        const products = await Product.find({name: name})

        if(products.length>0){
            return { 
                status: false,
                msg: 'Ya existe un producto con este nombre' 
            }
        }
    }

    product.name = name.trim()
    product.image = image.trim(),
    product.description = description.trim(),
    product.price = price,
    product.Category = Category,
    product.quantity = quantity

    await product.save()

    return {
        status: true,
        data: product
    }
})