import { Schema, Types } from 'mongoose'

const invoiceSchema = new Schema({
    invoiceNumber: {
        type: String,
        unique: true,
        required: true
    },
    userId:{
        type: Types.ObjectId,
        ref:'User'
    },
    delivered:{
        type: Boolean,
        required: true,
    },
    fullName:{
        type: String,
        required: true
    },
    DNI:{
        type: Number,
        required: true
    },
    phone:{
        type: Number,
        required: true
    },
    geoPosition:{
        type: String,
        required: true
    },
    items:[{
        productId: {
            type: Types.ObjectId,
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
    total_price: {
        type: Number,
        required: true,
    } 
},{
    timestamps: true,
})

export default invoiceSchema