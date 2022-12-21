import Product from "~~/server/db/models/product"
import aws from 'aws-sdk'


export default defineEventHandler(async (event)=>{

    const receivedProduct = await readBody(event)

    const config = useRuntimeConfig()

    console.log(receivedProduct)

    const test = new Product(receivedProduct)

    console.log(test)

    test.save()

    return test
})