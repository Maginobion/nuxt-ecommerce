import Category from "~~/server/db/models/category"

export default defineEventHandler(async (event)=>{

    const bodyData = await readBody(event)

    const value = await Category.create(bodyData).catch(()=>{
        return{
            res: 'Inserte bien los datos'
        }
    })

    return {
        res: true
    }
})