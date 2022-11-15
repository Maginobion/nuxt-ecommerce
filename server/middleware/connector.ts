import connection from "../db"

export default defineEventHandler((event)=>{
    connection()
})