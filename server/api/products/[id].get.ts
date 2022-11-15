import jwt from 'jsonwebtoken'
import Product from '~~/server/db/models/product'

export default defineEventHandler(async (event)=>{

    const id = event.context.params.id

    console.log(id)

    const product = await Product.findById(id)

    return product
})