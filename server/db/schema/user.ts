import { Schema } from "mongoose"
import bcrypt, { compare } from 'bcrypt'
import User from "../models/user"

const userSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    pass:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true
    }
})

userSchema.pre('save', async function(next){
    
    const user = this
    
    if(user.isModified('pass')){
        user.pass = await bcrypt.hash(user.pass, 8)
    }

    next()
})

userSchema.statics.makeValidation = async (name, pass) => {

    const user = await User.findOne({name})

    if(!user?.name){
        return {
            status: false
        }
    }
    
    const isValid = await compare(pass, user.pass)

    if(!isValid){
        return {
            status: false
        }
    }
    
    return user
}

export default userSchema