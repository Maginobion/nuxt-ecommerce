import Category from "../db/models/category"

export default defineEventHandler(async (event)=>{

    const test = await Category.find({ name: 'test' })

    console.log(test)

    return{
        res: test
    }
})