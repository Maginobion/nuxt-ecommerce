import { Schema, Types } from 'mongoose'

const invoiceSchema = new Schema({
    invoiceNumber: {
        type: Number,
        unique: true,
        required: true
    },
    userId:{
        type: Types.ObjectId,
        ref:'User'
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