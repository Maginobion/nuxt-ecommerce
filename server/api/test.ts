import Category from "../db/models/category"

export default defineEventHandler((event)=>{

    const test = new Category({ name: 'test' })

    test.save()

    return{
        res: test
    }
})