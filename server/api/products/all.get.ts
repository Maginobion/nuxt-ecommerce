import Product from "~~/server/db/models/product"

export default defineEventHandler(async (event)=>{

    const query = getQuery(event)
    
    query ? {name: query?.name} : null

    const products = await Product.find(query)

    return products
})