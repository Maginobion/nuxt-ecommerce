import Category from "~~/server/db/models/category"

export default defineEventHandler(async (event)=>{

    const categories = await Category.find()

    return categories
})