import mongoose from "mongoose"

const connection = async () =>{
    const config = useRuntimeConfig()
    try{
        await mongoose.connect(config.mongo)
        console.log('Conectado a la DB')
    } catch (err) {
        console.error('Conexion fallida',err)
    }
}

export default connection