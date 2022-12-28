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

    
    if(user.role===0){
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

    if( isNaN(Number(price)) || isNaN(Number(quantity)) || price < 0 || quantity < 0){
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

    const product = await Product.findOne({name: name})

    if(product){
        return { 
            status: false,
            msg: 'Ya existe un producto con este nombre' 
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