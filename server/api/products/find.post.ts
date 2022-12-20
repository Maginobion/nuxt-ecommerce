import Product from "~~/server/db/models/product"

export default defineEventHandler(async (event)=>{

    const queries = getQuery(event)

    const regex = new RegExp(`${queries.text}`, "i")

    const test = await Product.find({name: regex })

    console.log(test)

    return test
})