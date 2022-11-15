import Product from "~~/server/db/models/product"

export default defineEventHandler(async (event)=>{

    const receivedProduct = await readBody(event)

    const test = new Product(receivedProduct)

    test.save()

    return test
})