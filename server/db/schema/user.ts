import mongoose, { ObjectId, Schema } from "mongoose"
import bcrypt, { compare } from 'bcrypt'
import User from "../models/user"
import Product from "../models/product"
import { UserType, ProductType, ProductLine } from "../types"

const userSchema = new Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    pass:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    role:{
        type: Number,
        required: true,
    },
    recoveryKey:{
        type: String
    },
    cart:{
        items:[{
            productId: {
                type: mongoose.Types.ObjectId,
                ref: 'Product'
            },
            productName: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            total_price: {
                type: Number,
                required: true
            }
        }],      
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
    
    return {
        status: true,
        user: user
    }
}

userSchema.methods.addToCart = async function(productId: number) {
    const product = await Product.findById(productId)

    if(!product){
        throw new Error('No existe el usuario en la BD')
    }

    const cart : UserType['cart'] = this.cart;
    const isExisting = cart.items.findIndex((elem:any) => new String(elem.productId).trim() === new String(product._id).trim());
    if (isExisting >= 0) {
        cart.items[isExisting].quantity += 1
        cart.items[isExisting].total_price += product.price
    } else {
        const productLine : ProductLine = { 
            productId: product._id.toString(),
            productName: product.name,
            quantity: 1,           
            total_price: product.price
        }
        cart.items.push(productLine);
    }

    return this.save()
    
}


userSchema.methods.removeFromCart = function(productId: number) {
    const cart = this.cart;
    const isExisting = cart.items.findIndex((objInItems:ProductType) => new String(objInItems._id).trim() === new String(productId).trim());
    if (isExisting >= 0) {
        cart.items.splice(isExisting, 1);
        return this.save();
    }
}

export default userSchema