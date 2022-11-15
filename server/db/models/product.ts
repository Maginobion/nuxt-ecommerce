import { model } from "mongoose";
import productSchema from "../schema/product";

const Product = model('Product', productSchema)

export default Product