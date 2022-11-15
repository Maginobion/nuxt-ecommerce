import { Schema } from "mongoose";

const productSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    description:{
        type: String,
        required: true,
    },
    image:{
        type: String,
        required: true,
    },
    Category:{
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    price: {
        type: Number,
        required: true,
        default: 0,
        min: 0,
    },
    quantity: {
        type: Number,
        required: true,
        default: 0,
        min: 0,
    }
})

export default productSchema