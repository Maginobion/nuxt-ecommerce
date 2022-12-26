import Product from "~~/server/db/models/product"
import CategoryModel from "~~/server/db/models/category"

export default defineEventHandler(async (event)=>{

    const { id , name, description, image, Category, price, quantity }  = await readBody(event)

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