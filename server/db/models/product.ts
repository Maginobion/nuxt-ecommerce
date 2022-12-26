import mongoose, { model } from "mongoose";
import productSchema from "../schema/product";

const Product = mongoose.models.Product || model('Product', productSchema)

export default Product