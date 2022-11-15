import Product from "~~/server/db/models/product"

export default defineEventHandler(async (event)=>{

    const receivedData = await readBody(event)

    const test = await Product.find({name: receivedData})

    console.log(test)

    return test
})